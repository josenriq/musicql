import mongoose from 'mongoose';

export default mongoose.model('Room', new mongoose.Schema({
  name: { type: String }
}));
