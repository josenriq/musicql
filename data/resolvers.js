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
  Mutation: {
    addRoom(_, args) {
      const room = new Room(args);
      return room.save();
    },
    deleteRoom(_, args) {
      return Room.remove(args).then(() => {
        return Song.find({ room: args._id }).remove();
      });
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
