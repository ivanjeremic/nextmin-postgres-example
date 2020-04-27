import { ApolloServer, gql } from 'apollo-server-micro';
import Knex from 'knex';

const db = new Knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'Swordfish20#',
    database: 'postgres'
  }
});

const typeDefs = gql`
  type Query {
    artists(first: Int = 25, skip: Int = 0): [Artist!]!
  }

  type Artist {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    artists: (_parent, args, _context) => {
      return db
        .select('*')
        .from('artists')
        .limit(Math.min(args.first, 50))
        .offset(args.skip);
    }
  }

  /* Artist: {
    id: (artists, _args, _context) => artists.id
  } */
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false
  }
};

export default handler;
