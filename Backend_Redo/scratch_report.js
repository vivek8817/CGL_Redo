const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, 'seed.json');
const dataDir = path.join(__dirname, 'data');
const historyDir = path.join(dataDir, 'history');

// Read seed data
const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

// Find all json files
const files = [];
if (fs.existsSync(dataDir)) {
  fs.readdirSync(dataDir).forEach(file => {
    if (file.endsWith('.json')) files.push(path.join(dataDir, file));
  });
}
if (fs.existsSync(historyDir)) {
  fs.readdirSync(historyDir).forEach(file => {
    if (file.endsWith('.json')) files.push(path.join(historyDir, file));
  });
}

// Count mcqs per chapterId
const mcqCounts = {};

files.forEach(file => {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.chapterId) {
          mcqCounts[item.chapterId] = (mcqCounts[item.chapterId] || 0) + 1;
        }
      });
    }
  } catch (e) {
    console.error('Error reading', file, e.message);
  }
});

// Generate report
let report = '# MCQ Availability Report\n\n';

seedData.forEach(subject => {
  report += `## ${subject.title} (${subject.id})\n\n`;
  
  if (subject.isNested && subject.subSubjects) {
    subject.subSubjects.forEach(sub => {
      report += `### ${sub.title} (${sub.id})\n`;
      let hasAny = false;
      sub.chapters.forEach(ch => {
        if (mcqCounts[ch.id]) {
          report += `- **ID:** ${ch.id} | **Name:** ${ch.title} | **Count:** ${mcqCounts[ch.id]} MCQs\n`;
          hasAny = true;
        }
      });
      if (!hasAny) {
        report += `- *No MCQs available yet*\n`;
      }
      report += '\n';
    });
  } else if (subject.chapters) {
    let hasAny = false;
    subject.chapters.forEach(ch => {
      if (mcqCounts[ch.id]) {
        report += `- **ID:** ${ch.id} | **Name:** ${ch.title} | **Count:** ${mcqCounts[ch.id]} MCQs\n`;
        hasAny = true;
      }
    });
    if (!hasAny) {
      report += `- *No MCQs available yet*\n`;
    }
    report += '\n';
  }
});

fs.writeFileSync(path.join(__dirname, 'mcq_report.md'), report);
console.log('Report generated at mcq_report.md');
