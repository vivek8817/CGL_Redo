import { Request, Response } from 'express';
import  Subject  from '../models/Subject'; // Adjust or remove extension based on your project setup
import Mcq from '../models/Mcq';

/**
 * Seed the database by replacing all existing subject data
 */
export const seedSyllabus = async (
  req: Request<{}, {}, any[]>, 
  res: Response
): Promise<Response> => {
  try {
    const syllabusData = req.body;

    // Validate that the request body contains an array
    if (!Array.isArray(syllabusData) || syllabusData.length === 0) {
      return res.status(400).json({ 
        message: "Invalid data format. Expected a non-empty array of subjects." 
      });
    }

    // Wipe out the existing collection data
    await Subject.deleteMany({});

    // Bulk insert the new massive JSON dataset
    const insertedData = await Subject.insertMany(syllabusData);

    return res.status(201).json({
      message: "Syllabus seeded successfully!",
      count: insertedData.length
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred during seeding";
    return res.status(500).json({ message: errorMessage });
  }
};

/**
 * Fetch all subjects from the database
 */
/**
 * Fetch all subjects from the database and inject the dynamic totalMcqs count!
 */

// Dynamic Sectioning Helper
function generateSections(total: number) {
  if (total <= 0) return [];
  if (total < 25) {
    return [{ id: 1, title: 'Section 1', totalMcqs: total, startIdx: 0, endIdx: total }];
  }
  
  const numFull = Math.floor(total / 20);
  const rem = total % 20;
  
  const sections = [];
  let currentStart = 0;

  if (rem === 0) {
    for (let i = 0; i < numFull; i++) {
      sections.push({ id: i + 1, title: `Section ${i + 1}`, totalMcqs: 20, startIdx: currentStart, endIdx: currentStart + 20 });
      currentStart += 20;
    }
  } else if (rem < 5) {
    for (let i = 0; i < numFull - 1; i++) {
      sections.push({ id: i + 1, title: `Section ${i + 1}`, totalMcqs: 20, startIdx: currentStart, endIdx: currentStart + 20 });
      currentStart += 20;
    }
    sections.push({ id: numFull, title: `Section ${numFull}`, totalMcqs: 20 + rem, startIdx: currentStart, endIdx: currentStart + 20 + rem });
  } else {
    for (let i = 0; i < numFull; i++) {
      sections.push({ id: i + 1, title: `Section ${i + 1}`, totalMcqs: 20, startIdx: currentStart, endIdx: currentStart + 20 });
      currentStart += 20;
    }
    sections.push({ id: numFull + 1, title: `Section ${numFull + 1}`, totalMcqs: rem, startIdx: currentStart, endIdx: currentStart + rem });
  }
  return sections;
}

export const getSyllabus = async (
  req: Request, 
  res: Response
): Promise<Response> => {
  try {
    // 1. Retrieve all records from the subjects collection
    // .lean() strips the Mongoose wrapper so we can modify the objects freely
    const subjects = await Subject.find({}).lean();

    // 2. Count the MCQs grouped by chapterId using an ultra-fast Aggregation!
    // This gives us an array like: [{ _id: 'bio-1', count: 12 }, { _id: 'hist-anc-1', count: 15 }]
    const mcqCounts = await Mcq.aggregate([
      { $group: { _id: "$chapterId", count: { $sum: 1 } } }
    ]);

    // 3. Convert that array into a dictionary map for instant lookups
    // Looks like: { "bio-1": 12, "hist-anc-1": 15 }
    const countsMap = mcqCounts.reduce((acc: Record<string, number>, curr: any) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    
    // 4. Traverse our subjects and inject the 'totalMcqs' and 'sections' property
    subjects.forEach((subject: any) => {
      if (subject.chapters) {
        subject.chapters.forEach((chapter: any) => {
          chapter.totalMcqs = countsMap[chapter.id] || 0;
          chapter.sections = generateSections(chapter.totalMcqs);
        });
      }
      if (subject.subSubjects) {
        subject.subSubjects.forEach((subSubject: any) => {
          if (subSubject.chapters) {
            subSubject.chapters.forEach((chapter: any) => {
              chapter.totalMcqs = countsMap[chapter.id] || 0;
              chapter.sections = generateSections(chapter.totalMcqs);
            });
          }
        });
      }
    });

    return res.status(200).json(subjects);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred while fetching syllabus";
    return res.status(500).json({ message: errorMessage });
  }
};
