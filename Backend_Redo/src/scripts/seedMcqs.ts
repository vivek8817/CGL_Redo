import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Mcq from '../models/Mcq';
import dns from 'dns';

dotenv.config({ path: path.join(__dirname, '../../.env') });

// Force Google DNS to bypass local ISP blocks on SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cgl_db';

// Helper function to recursively find all JSON files in a directory
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const seedMcqs = async () => {
  try {
    // Force IPv4 to fix DNS SRV ECONNREFUSED issues on Windows
    await mongoose.connect(MONGO_URI, { family: 4 });
    console.log('✅ Connected to MongoDB for seeding MCQs...');

    const dataDir = path.join(__dirname, '../../data');
    const allFiles = getAllFiles(dataDir);
    
    // Filter to only include files ending in _mcqs.json
    const jsonFiles = allFiles.filter(file => file.endsWith('_mcqs.json'));

    if (jsonFiles.length === 0) {
        console.error(`❌ No *_mcqs.json files found in ${dataDir}`);
        process.exit(1);
    }

    console.log(`📁 Found ${jsonFiles.length} MCQ files to process...`);

    let totalInserted = 0;

    for (const filePath of jsonFiles) {
        const fileName = path.basename(filePath);
        const mcqsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        if (!Array.isArray(mcqsData) || mcqsData.length === 0) {
            console.warn(`⚠️ Skipping empty file: ${fileName}`);
            continue;
        }

        // Find unique chapterIds in this specific JSON file and delete them from DB to avoid duplicates
        const chapterIdsToSeed = [...new Set(mcqsData.map(mcq => mcq.chapterId))];
        console.log(`🧹 [${fileName}] Clearing old MCQs for chapters: ${chapterIdsToSeed.join(', ')}`);
        await Mcq.deleteMany({ chapterId: { $in: chapterIdsToSeed } });

        // Insert the new MCQs
        console.log(`📥 [${fileName}] Inserting ${mcqsData.length} MCQs...`);
        await Mcq.insertMany(mcqsData);
        totalInserted += mcqsData.length;
    }

    console.log(`\n🎉 BOOM! A massive total of ${totalInserted} MCQs were injected successfully across all subjects!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedMcqs();
