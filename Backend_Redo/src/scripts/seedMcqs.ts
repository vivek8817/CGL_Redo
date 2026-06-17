import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Mcq from '../models/Mcq';

dotenv.config();

import dns from 'dns';

// Force Google DNS to bypass local ISP blocks on SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cgl_db';

const seedMcqs = async () => {
  try {
    // Force IPv4 to fix DNS SRV ECONNREFUSED issues on Windows
    await mongoose.connect(MONGO_URI, { family: 4 });
    console.log('✅ Connected to MongoDB for seeding MCQs...');

    // 1. Read the JSON file (Make sure you pass the filename as an argument or change the path here)
    const filePath = path.join(__dirname, '../../data/geography_mcqs.json');
    
    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found at ${filePath}`);
        console.log('Please create the data/geography_mcqs.json file with your questions!');
        process.exit(1);
    }

    const mcqsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if (!Array.isArray(mcqsData) || mcqsData.length === 0) {
        console.error('❌ JSON file is empty or not an array!');
        process.exit(1);
    }

    // Optional: If you want to clear all existing geography questions first to avoid duplicates
    // You can find unique chapterIds in your JSON and delete existing ones
    const chapterIdsToSeed = [...new Set(mcqsData.map(mcq => mcq.chapterId))];
    console.log(`🧹 Clearing old MCQs for chapters: ${chapterIdsToSeed.join(', ')}...`);
    await Mcq.deleteMany({ chapterId: { $in: chapterIdsToSeed } });

    // 2. Insert the new MCQs
    console.log(`📥 Inserting ${mcqsData.length} new MCQs...`);
    await Mcq.insertMany(mcqsData);

    console.log('🎉 MCQ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedMcqs();
