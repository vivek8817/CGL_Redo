import mongoose, { Schema, Document } from "mongoose";

// Interfaces for our embedded documents
export interface IChapter {
  _id: mongoose.Types.ObjectId;
  title: string;
}

export interface ISubSubject {
  _id: mongoose.Types.ObjectId;
  title: string;
  icon?: string;
  chapters: IChapter[];
}

// Interface for the main Subject document
export interface ISubject extends Document {
  title: string;
  icon: string;
  isNested: boolean;
  chapters?: IChapter[];
  subSubjects?: ISubSubject[];
}

const ChapterSchema = new Schema({
  id: { type: String, required: true }, // <-- ADD THIS
  title: { type: String, required: true },
});

const SubSubjectSchema = new Schema({
  id: { type: String, required: true }, // <-- ADD THIS
  title: { type: String, required: true },
  icon: { type: String },
  chapters: [ChapterSchema],
});

const SubjectSchema: Schema = new Schema(
  {
    id: { type: String, required: true }, // <-- ADD THIS
    title: { type: String, required: true },
    icon: { type: String, required: true },
    isNested: { type: Boolean, required: true, default: false },
    chapters: [ChapterSchema],
    subSubjects: [SubSubjectSchema],
  },
  { timestamps: true },
);

export default mongoose.model<ISubject>("Subject", SubjectSchema);
