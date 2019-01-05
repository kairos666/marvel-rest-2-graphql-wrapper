import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
    # Comments in GraphQL are defined with the hash (#) symbol.

    # This "Book" type can be used in other type declarations.
    type Book {
        title: String
        author: String
    }

    # The "Query" type is the root of all GraphQL queries.
    # (A "Mutation" type will be covered later on.)
    type Query {
        books: [Book]
    }
`;

const mockDB = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    }
]

const resolvers = {
    Query: {
      books: () => mockDB,
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }:any) => {
    console.log(`🚀  Server ready at ${url}`);
});

export default server;