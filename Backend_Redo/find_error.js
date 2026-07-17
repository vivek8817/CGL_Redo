const fs = require('fs');
const lines = fs.readFileSync('./data/staticGk_mcqs.json', 'utf8').split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"options": [')) {
    let found = false;
    for (let j = 1; j <= 25; j++) {
      if (i+j < lines.length && (lines[i+j].includes('],') || lines[i+j].includes(']'))) {
        found = true;
        break;
      }
    }
    if (!found) {
      console.log('Unclosed options around line', i+1);
    }
  }
}
