import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';
const app = express();
app.use(cors()); //Middleware to fix possible issues interacting with other local apps
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
export default app;
