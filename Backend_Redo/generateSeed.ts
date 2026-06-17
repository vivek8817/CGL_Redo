import * as fs from 'fs';
import { subjectsData } from '../Frontend_Redo/src/data/subjects';

fs.writeFileSync('seed_data.json', JSON.stringify(subjectsData, null, 2));
console.log('Successfully created seed_data.json!');
