import mockData from '../mockData.json';

export const resolver = {
    Query: {
        comics: () => mockData.comics,
        comic: (_:any, args:any) => mockData.comics.find(item => (item.id === args.id))
    },
    Comic: {
        characters: async (comic:any, _args:any, { dataSources }) => {
            return Promise.all(comic.characters.map(character => dataSources.marvelAPI.getCharacterById(character.id)));
        },
        stories: async (comic:any, _args:any, { dataSources }) => {
            return Promise.all(comic.stories.map(story => dataSources.marvelAPI.getStoryById(story.id)));
        }
    }
};