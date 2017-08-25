import { Room, Song } from './models';

const resolvers = {
  Query: {
    rooms() {
      return Room.find();
    },
    room(_, args) {
      return Room.findOne(args);
    },
    songs() {
      return Song.find();
    }
  },
  Room: {
    songs(room) {
      return Song.find({ room: room._id });
    }
  },
  Song: {
    room(song) {
      return Room.findOne({ _id: song.room });
    }
  }
};

export default resolvers;
