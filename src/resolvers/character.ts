export const resolver = {
    Query: {
        characters: () => [],
        character: async (_source:any, { id }, { dataSources }) => {
            return dataSources.marvelAPI.getCharacterById(id);
        }
    },
    Character: {
        comics: async (character:any, _args:any, { dataSources }) => {
            return dataSources.marvelAPI.getComicsByCharacterId(Object.assign({ id: character.id }, _args));
        },
        stories: async (character:any, _args:any, { dataSources }) => {
            return dataSources.marvelAPI.getStoriesByCharacterId(Object.assign({ id: character.id }, _args));
        },
        events: async (character:any, _args:any, { dataSources }) => {
            return dataSources.marvelAPI.getEventsByCharacterId(Object.assign({ id: character.id }, _args));
        },
        series: async (character:any, _args:any, { dataSources }) => {
            return dataSources.marvelAPI.getSeriesByCharacterId(Object.assign({ id: character.id }, _args));
        }
    }
};