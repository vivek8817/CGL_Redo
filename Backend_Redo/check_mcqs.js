const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const historyDir = path.join(dataDir, 'history');
const seedPath = path.join(__dirname, 'seed.json');

// Get all chapter IDs from seed.json
const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
const expectedChapters = new Map(); // id -> title

function extractChapters(obj) {
  if (obj.chapters) {
    obj.chapters.forEach(ch => {
      expectedChapters.set(ch.id, ch.title);
    });
  }
  if (obj.subSubjects) {
    obj.subSubjects.forEach(sub => extractChapters(sub));
  }
}

seedData.forEach(subject => extractChapters(subject));

// Get actual MCQ counts
const actualCounts = new Map();

function countMcqsInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.trim()) return;
  try {
    const mcqs = JSON.parse(content);
    if (Array.isArray(mcqs)) {
      mcqs.forEach(mcq => {
        if (mcq.chapterId) {
          actualCounts.set(mcq.chapterId, (actualCounts.get(mcq.chapterId) || 0) + 1);
        }
      });
    }
  } catch (e) {
    console.error('Error parsing', filePath, e);
  }
}

countMcqsInFile(path.join(dataDir, 'biology_mcqs.json'));
countMcqsInFile(path.join(dataDir, 'geography_mcqs.json'));
countMcqsInFile(path.join(dataDir, 'polity_mcqs.json'));
countMcqsInFile(path.join(historyDir, 'ancient_mcqs.json'));
countMcqsInFile(path.join(historyDir, 'medieval_mcqs.json'));
countMcqsInFile(path.join(historyDir, 'modern_mcqs.json'));

// Generate Report
console.log('--- MCQ Coverage Report ---');
let missingChapters = [];
expectedChapters.forEach((title, id) => {
  const count = actualCounts.get(id) || 0;
  console.log(`[${id}] ${title}: ${count} MCQs`);
  if (count === 0) {
    missingChapters.push(id);
  }
});

console.log('\n--- Summary ---');
console.log(`Total Expected Chapters: ${expectedChapters.size}`);
console.log(`Chapters with 0 MCQs: ${missingChapters.length}`);
if (missingChapters.length > 0) {
  console.log(`Missing Chapters IDs: ${missingChapters.join(', ')}`);
}

// Find extra chapter IDs in MCQs that are NOT in seed.json
let extraChapters = [];
actualCounts.forEach((count, id) => {
  if (!expectedChapters.has(id)) {
    extraChapters.push({ id, count });
  }
});

if (extraChapters.length > 0) {
  console.log('\n--- Warning: Unmapped Chapter IDs found in MCQs ---');
  extraChapters.forEach(e => {
    console.log(`Unknown ID '${e.id}': ${e.count} MCQs`);
  });
}
