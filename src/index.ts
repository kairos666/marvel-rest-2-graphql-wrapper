import { ApolloServer, gql, IResolvers  } from 'apollo-server';
import { merge } from 'lodash';

/**
 * GRAPHQL SCHEMA
 */
// types
import { typeDef as Character } from './schemas/character';
import { typeDef as Comic } from './schemas/comic';
import { typeDef as Story } from './schemas/story';
import { typeDef as Image } from './schemas/image';
import { typeDef as Query } from './schemas/query';

const typeDefs = gql`${[Query, Character, Comic, Story, Image].join('\n')}`;

/**
 * GRAPHQL RESOLVER
 */
// resolvers
import { resolver as CharacterResolver } from './resolvers/character';
import { resolver as ComicResolver } from './resolvers/comic';
import { resolver as StoryResolver } from './resolvers/story';
import { resolver as ImageResolver } from './resolvers/image';
import { MarvelAPI } from './datasources/MarvelAPI';

const resolvers:IResolvers = merge({}, CharacterResolver, ComicResolver, StoryResolver, ImageResolver);

/**
 * GRAPHQL DATASOURCES
 */
const dataSources = () => {
    return {
        marvelAPI: new MarvelAPI()
    }
}

/**
 * GRAPHQL CONTEXT
 */
const context = () => {
    return {
        publicApiKey:"fakePublicKey",
        privateApiKey:"fakePrivateKey"
    }
}

/**
 * INSTANTIATE APOLLO SERVER
 */
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    dataSources,
    context
});
server.listen().then(({ url }:any) => {
    console.log(`🚀  Server ready at ${url}`);
});

export default server;