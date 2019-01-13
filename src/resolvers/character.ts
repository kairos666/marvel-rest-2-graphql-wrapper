import { MarvelAPI } from '../datasources/MarvelAPI';

export const resolver = {
    Query: {
        characters: async (_source:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).findCharacters(_args);
        },
        character: async (_source:any, { id }, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getCharacterById(id);
        }
    },
    Character: {
        comics: async (character:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getComicsByCharacterId(Object.assign({ id: character.id }, _args));
        },
        stories: async (character:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getStoriesByCharacterId(Object.assign({ id: character.id }, _args));
        },
        events: async (character:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getEventsByCharacterId(Object.assign({ id: character.id }, _args));
        },
        series: async (character:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getSeriesByCharacterId(Object.assign({ id: character.id }, _args));
        }
    }
};