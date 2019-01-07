import mockData from '../mockData.json';

export const resolver = {
    Query: {
        characters: () => mockData.characters,
        character: async (_source:any, { id }, { dataSources }) => {
            return dataSources.marvelAPI.getCharacterById(id);
        }
    },
    Character: {
        comics: async (character:any, _args:any, { dataSources }) => {
            return Promise.all(character.comics.map(comic => dataSources.marvelAPI.getComicById(comic.id)));
        },
        stories: (character:any) => {
            return character.stories; // TODO
        }
    }
};