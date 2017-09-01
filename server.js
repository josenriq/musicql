import express from 'express';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import schema from './data/schema';

mongoose.connect('mongodb://dbuser:08ACFB9A-2A34-4920-88C0-2BBFE16F42B5@ds159493.mlab.com:59493/musicql');

const PORT = process.env.PORT || 3000;

const server = express();

server.use(cors());

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

server.listen(PORT, () => console.log(
  `GraphiQL is now running on http://localhost:${ PORT }/graphiql`
));
