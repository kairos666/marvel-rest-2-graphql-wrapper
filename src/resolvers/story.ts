import { MarvelAPI } from '../datasources/MarvelAPI';

export const resolver = {
    Query: {
        stories: () => null,
        story: async (_source:any, { id }, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getStoryById(id);
        }
    },
    Story: {
        comics: async (story:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getComicsByStoryId(Object.assign({ id: story.id }, _args));
        },
        originalIssue: async (story:any, _args:any, { dataSources }) => {
            return (story.originalIssue !== null) ? (dataSources.marvelAPI as MarvelAPI).getComicById(story.originalIssue) : null;
        },
        characters: async (story:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getCharactersByStoryId(Object.assign({ id: story.id }, _args));
        },
        series: async (story:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getSeriesByStoryId(Object.assign({ id: story.id }, _args));
        },
        events: async (story:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getEventsByStoryId(Object.assign({ id: story.id }, _args));
        },
        creators: async (story:any, _args:any, { dataSources }) => {
            return (dataSources.marvelAPI as MarvelAPI).getCreatorsByStoryId(Object.assign({ id: story.id }, _args));
        }
    }
};