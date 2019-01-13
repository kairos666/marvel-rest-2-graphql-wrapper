import { MarvelAPI } from '../datasources/MarvelAPI';

export const resolver = {
    Query: {
        series: () => null,
        serie: async (_source:any, { id }, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getSerieById(id);
        }
    },
    Serie: {
        comics: async (serie:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getComicsBySerieId(Object.assign({ id: serie.id }, _args));
        },
        characters: async (serie:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getCharactersBySerieId(Object.assign({ id: serie.id }, _args));
        },
        events: async (serie:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getEventsBySerieId(Object.assign({ id: serie.id }, _args));
        },
        creators: async (serie:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getCreatorsBySerieId(Object.assign({ id: serie.id }, _args));
        },
        stories: async (serie:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getStoriesBySerieId(Object.assign({ id: serie.id }, _args));
        },
        next: async (serie:any, _args:any, { dataSources }) => {
            return (serie.next !== null) ? (dataSources.marvelAPI as MarvelAPI).getSerieById(serie.next) : null;
        },
        previous: async (serie:any, _args:any, { dataSources }) => {
            return (serie.previous !== null) ? (dataSources.marvelAPI as MarvelAPI).getSerieById(serie.previous) : null;
        }
    }
};