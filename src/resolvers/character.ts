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
        stories: async (character:any, _args:any, { dataSources }) => {
            return Promise.all(character.stories.map(story => dataSources.marvelAPI.getStoryById(story.id)));
        },
        events: async (character:any, _args:any, { dataSources }) => {
            return Promise.all(character.events.map(event => dataSources.marvelAPI.getEventById(event.id)));
        },
        series: async (character:any, _args:any, { dataSources }) => {
            return Promise.all(character.series.map(serie => dataSources.marvelAPI.getSerieById(serie.id)));
        }
    }
};