import mongoose, { Schema, Document } from 'mongoose';

export interface IOption {
  id: number;
  text: string;
}

export interface IMcq extends Document {
  chapterId: string; // E.g. "hist-anc-1"
  text: string;
  options: IOption[];
  correctOptionId: number;
  explanation: string;
}

const OptionSchema = new Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true }
}, { _id: false }); // We don't need MongoDB _id for every single option

const McqSchema: Schema = new Schema({
  chapterId: { type: String, required: true, index: true }, // Indexing makes searching for chapters lightning fast!
  text: { type: String, required: true },
  options: [OptionSchema],
  correctOptionId: { type: Number, required: true },
  explanation: { type: String, default: "No explanation provided." }
}, { timestamps: true });

export default mongoose.model<IMcq>('Mcq', McqSchema);
