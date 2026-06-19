const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data/geography_mcqs.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

data.forEach((mcq, index) => {
    let hasError = false;
    mcq.options.forEach((opt, optIndex) => {
        if (!opt.text || opt.text.trim() === '') {
            hasError = true;
            console.log(`Error in MCQ index ${index} (Chapter ${mcq.chapterId}): Option ${optIndex} is empty!`);
        }
    });
    if (hasError) {
        console.log(`Question: ${mcq.text}\n`);
    }
});
