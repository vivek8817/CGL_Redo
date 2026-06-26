import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  chapterProgress: { chapterId: string; attempted: number; wrong: number; wrongQuestionIds: mongoose.Types.ObjectId[] }[];
  bookmarks: mongoose.Types.ObjectId[]; // Array of MCQ IDs
  dailyActivity: { date: string; attempted: number; correct: number }[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  
  // NEW FIELDS:
  chapterProgress: [{
    chapterId: { type: String },
    attempted: { type: Number, default: 0 },
    wrong: { type: Number, default: 0 },
    wrongQuestionIds: [{ type: Schema.Types.ObjectId, ref: 'Mcq' }]
  }],
  bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Mcq' }], // Links directly to the Mcq collection!
  dailyActivity: [{
    date: { type: String }, // "2026-06-17"
    attempted: { type: Number, default: 0 },
    correct: { type: Number, default: 0 }
  }]
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
