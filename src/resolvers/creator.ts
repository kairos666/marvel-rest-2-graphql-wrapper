import { MarvelAPI } from '../datasources/MarvelAPI';

export const resolver = {
    Query: {
        creators: async (_source:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).findCreators(_args);
        },
        creator: async (_source:any, { id }, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getCreatorById(id);
        }
    },
    Creator: {
        comics: async (creator:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getComicsByCreatorId(Object.assign({ id: creator.id }, _args));
        },
        events: async (creator:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getEventsByCreatorId(Object.assign({ id: creator.id }, _args));
        },
        series: async (creator:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getSeriesByCreatorId(Object.assign({ id: creator.id }, _args));
        },
        stories: async (creator:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getStoriesByCreatorId(Object.assign({ id: creator.id }, _args));
        }
    }
};