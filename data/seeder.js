import mongoose from 'mongoose';
import { Room, Song } from './models';

async function seeder() {
	await Room.remove({});
	await Song.remove({});

	const data = [{
		room: {
			name: 'Main Area'
		},
		songs: [{
      title: 'La Espada y La Pared',
      performer: 'Los Tres',
      url: 'https://www.youtube.com/watch?v=3lEw4-olZZg'
    }, {
      title: 'Six Days',
      performer: 'DJ Shadow',
      url: 'https://www.youtube.com/watch?v=eY-eyZuW_Uk'
		}]
	}, {
		room: {
			name: 'Pink Meeting Room'
		},
		songs: [{
      title: 'Redbone',
      performer: 'Childish Gambino',
      url: 'https://www.youtube.com/watch?v=Kp7eSUU9oy8'
    }]
	}];

	const promises = data.map(entry => {
		return Room.create(entry.room).then(room => {
			return Promise.all(entry.songs.map(song => {
				song.room = room._id;
				return Song.create(song);
			}));
		});
	});

  return Promise.all(promises);
}

const closeConnection = () => {
	mongoose.connection.close(() => {
		console.log('Done, mongoose connection disconnected.');
	});
};

async function initSeed() {
	await mongoose.connect('mongodb://dbuser:08ACFB9A-2A34-4920-88C0-2BBFE16F42B5@ds159493.mlab.com:59493/musicql');

	console.log('***** seeding...');
	await seeder();

	closeConnection();
}

initSeed();
