import { MarvelAPI } from '../datasources/MarvelAPI';

export const resolver = {
    Query: {
        comics: () => [],
        comic: async (_source:any, { id }, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getComicById(id);
        }
    },
    Comic: {
        characters: async (comic:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getCharactersByComicId(Object.assign({ id: comic.id }, _args));
        },
        stories: async (comic:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getStoriesByComicId(Object.assign({ id: comic.id }, _args));
        },
        events: async (comic:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getEventsByComicId(Object.assign({ id: comic.id }, _args));
        },
        series: async (comic:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getSeriesByComicId(Object.assign({ id: comic.id }, _args));
        },
        creators: async (comic:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getCreatorsByComicId(Object.assign({ id: comic.id }, _args));
        }
    }
};