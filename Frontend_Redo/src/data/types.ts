export interface Option {
  id: number;
  text: string;
}

export interface MCQ {
  id: number;
  text: string;
  options: Option[];
  correctOptionId: number;
  explanation: string;
}

export interface Chapter {
  id: string;
  title: string;
  
  // Static content
  mcqs?: MCQ[]; // The actual questions (can be imported separately)
  
  // Mock Progress Data (To make the UI fully functional for testing)
  totalMcqs: number;
  attempted: number;
  wrong: number;
  bookmarked: number;
  progressLevel: 'Strong' | 'Improving' | 'Weak' | 'Not Started';
}

export interface SubSubject {
  id: string;
  title: string;
  chapters: Chapter[];
}

export interface Subject {
  id: string;
  title: string;
  icon?: string; // Iconify icon name
  
  // A subject will either have 'chapters' (Flat) OR 'subSubjects' (Nested)
  chapters?: Chapter[];
  subSubjects?: SubSubject[];
}
