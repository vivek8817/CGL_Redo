import { Request, Response } from 'express';
import  Subject  from '../models/Subject'; // Adjust or remove extension based on your project setup

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
export const getSyllabus = async (
  req: Request, 
  res: Response
): Promise<Response> => {
  try {
    // Retrieve all records from the subjects collection
    const subjects = await Subject.find({});

    return res.status(200).json(subjects);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred while fetching syllabus";
    return res.status(500).json({ message: errorMessage });
  }
};
