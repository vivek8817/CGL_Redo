import { Request, Response } from 'express';
import  Mcq  from '../models/Mcq'; // Adjust the path and extension based on your project setup

// Interface for the URL route parameters
interface ChapterParams {
  chapterId: string;
}

// Interface for a single MCQ structure inside the request body array
interface McqItem {
  question: string;
  options: string[];
  correctAnswer: string;
  [key: string]: any; // Allows additional fields like explanation, difficulty, etc.
}

/**
 * Seed MCQs for a specific chapter (Admin Postman tool)
 */
export const seedMcqs = async (
  req: Request<ChapterParams, {}, McqItem[]>,
  res: Response
): Promise<Response> => {
  try {
    const { chapterId } = req.params;
    const mcqsData = req.body;

    // Guard clause: Validate chapterId existence
    if (!chapterId) {
      return res.status(400).json({ message: "Missing chapterId in route parameters." });
    }

    // Guard clause: Validate request body structure
    if (!Array.isArray(mcqsData) || mcqsData.length === 0) {
      return res.status(400).json({ 
        message: "Invalid data format. Expected a non-empty array of MCQs." 
      });
    }

    // Inject the chapterId dynamically into every question object
    const formattedMcqs = mcqsData.map((q) => ({ 
      ...q, 
      // Use the chapterId from the JSON file if it exists, otherwise fallback to URL
      chapterId: q.chapterId ? q.chapterId : chapterId 
    }));

    // Bulk insert into MongoDB via Mongoose
    const insertedMcqs = await Mcq.insertMany(formattedMcqs);

    return res.status(201).json({
      message: `Successfully seeded MCQs for chapter: ${chapterId}`,
      count: insertedMcqs.length,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error during MCQ seeding";
    return res.status(500).json({ message: errorMessage });
  }
};

/**
 * Fetch all MCQs belonging to a specific chapter (Frontend endpoint)
 */
export const getMcqsByChapter = async (
  req: Request<ChapterParams>,
  res: Response
): Promise<Response> => {
  try {
    const { chapterId } = req.params;

    if (!chapterId) {
      return res.status(400).json({ message: "Missing chapterId parameter." });
    }

    // Retrieve documents where chapterId matches the targeted value
    const mcqs = await Mcq.find({ chapterId });

    return res.status(200).json(mcqs);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error while fetching MCQs";
    return res.status(500).json({ message: errorMessage });
  }
};
