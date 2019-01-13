import { MarvelAPI } from '../datasources/MarvelAPI';

export const resolver = {
    Query: {
        events: async (_source:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).findEvents(_args);
        },
        event: async (_source:any, { id }, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getEventById(id);
        }
    },
    Event: {
        comics: async (event:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getComicsByEventId(Object.assign({ id: event.id }, _args));
        },
        characters: async (event:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getCharactersByEventId(Object.assign({ id: event.id }, _args));
        },
        series: async (event:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getSeriesByEventId(Object.assign({ id: event.id }, _args));
        },
        stories: async (event:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getStoriesByEventId(Object.assign({ id: event.id }, _args));
        },
        creators: async (event:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getCreatorsByEventId(Object.assign({ id: event.id }, _args));
        },
        next: async (event:any, _args:any, { dataSources }) => {
            return (event.next !== null) ? (dataSources.marvelAPI as MarvelAPI).getEventById(event.next) : null;
        },
        previous: async (event:any, _args:any, { dataSources }) => {
            return (event.previous !== null) ? (dataSources.marvelAPI as MarvelAPI).getEventById(event.previous) : null;
        }
    }
};