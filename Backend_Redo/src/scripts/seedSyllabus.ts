import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Subject from '../models/Subject';
import dns from 'dns';

dotenv.config();

// Force Google DNS to bypass local ISP blocks on SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cgl_db';

const seedSyllabus = async () => {
  try {
    // Force IPv4 to fix DNS SRV ECONNREFUSED issues on Windows
    await mongoose.connect(MONGO_URI, { family: 4 });
    console.log('✅ Connected to MongoDB for seeding Syllabus...');

    const filePath = path.join(__dirname, '../../seed.json');

    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found at ${filePath}`);
        process.exit(1);
    }

    const syllabusData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if (!Array.isArray(syllabusData) || syllabusData.length === 0) {
        console.error('❌ JSON file is empty or not an array!');
        process.exit(1);
    }

    // Wipe out the existing syllabus
    console.log(`🧹 Clearing old Syllabus from database...`);
    await Subject.deleteMany({});

    // Insert the new syllabus
    console.log(`📥 Inserting new Syllabus structure...`);
    await Subject.insertMany(syllabusData);

    console.log('🎉 Syllabus Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedSyllabus();
