import { ApolloServer, gql } from 'apollo-server';

// types
import { typeDef as Character } from './schemas/character';
import { typeDef as Comic } from './schemas/comic';
import { typeDef as Story } from './schemas/story';
import { typeDef as Image } from './schemas/image';

// Query
const Query = `
    type Query {
        character: [Character]
        comic: [Comic]
        story: [Story]
    }
`;

const resolvers = {
    Query: {
      character: () => mockDB.characters,
      comic: () => mockDB.comics,
      story: () => null
    },
};

const typeDefs = gql`
    ${Query}
    ${Character}
    ${Comic}
    ${Story}
    ${Image}
`;

const mockDB = {
    characters: [
        { id: "character01", name: "Jackass man", description: "this guy is the Al Bundy of super heroes", thumbnail: { path: "image/path/file", extension: "png" }, comics: ["comic01", "comic03"] },
        { id: "character02", name: "the strange doctor", description: "The eponymous guy", thumbnail: { path: "image/path/file", extension: "png" }, comics: ["comic01"] },
        { id: "character03", name: "Tarantula man", description: "same as spider man but bigger", thumbnail: { path: "image/path/file", extension: "png" }, comics: ["comic02"] },
        { id: "character04", name: "Spider man", description: "the guy that sticks to walls", thumbnail: { path: "image/path/file", extension: "png" }, comics: ["comic02"] }
    ],
    comics: [
        { id: "comic01", title: "Docteur Strange", issueNumber: 3, description: "some comic book", format: "paper", pageCount: 233, thumbnail: { path: "image/path/file", extension: "png" }, characters: ["character01", "character02"] },
        { id: "comic02", title: "Amazing Tarantula man", issueNumber: 345, description: "some other comic book", format: "hard cover", pageCount: 103, thumbnail: { path: "image/path/file", extension: "png" }, characters: ["character04", "character03"] },
        { id: "comic03", title: "The invincible Jackass man", issueNumber: 5, description: "yet another comic book", format: "hard cover", pageCount: 2, thumbnail: { path: "image/path/file", extension: "png" }, characters: ["character01"] }
    ]
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }:any) => {
    console.log(`🚀  Server ready at ${url}`);
});

export default server;