import { ApolloServer, gql } from 'apollo-server';
import merge from 'lodash.merge';
import * as config from './marvel.config.json';

// API url
const apiURL:String = `${config.baseUrl}/${config.apiVersion}/${config.rootPath}/`; 

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

const typeDefs = gql`
    ${Query}
    ${Character}
    ${Comic}
    ${Story}
    ${Image}
`;

// resolvers
import { resolver as CharacterResolver } from './resolvers/character';
import { resolver as ComicResolver } from './resolvers/comic';
import { resolver as StoryResolver } from './resolvers/story';
import { resolver as ImageResolver } from './resolvers/image';

const resolvers = merge({}, CharacterResolver, ComicResolver, StoryResolver, ImageResolver);

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }:any) => {
    console.log(`🚀  Server ready at ${url}`);
});

export default server;