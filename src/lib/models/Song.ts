import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const SongSchema = new Schema(
  {
    title: { type: String, required: true },
    fileKey: { type: String, required: true }, // songs/uuid.mp3
    releasedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Song = models.Song || model('Song', SongSchema);
