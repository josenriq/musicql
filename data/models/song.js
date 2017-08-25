import mongoose from 'mongoose';

export default mongoose.model('Song', new mongoose.Schema({
  room:      { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  title:     { type: String },
  performer: { type: String },
  url:       { type: String }
}));
