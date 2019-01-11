export const resolver = {
    Query: {
        creators: () => null,
        creator: async (_source:any, { id }, { dataSources }) => {
            return dataSources.marvelAPI.getCreatorById(id);
        }
    },
    Creator: {
        comics: async (creator:any, _args:any, { dataSources }) => {
            return Promise.all(creator.comics.map(comic => dataSources.marvelAPI.getComicById(comic.id)));
        },
        events: async (creator:any, _args:any, { dataSources }) => {
            return Promise.all(creator.events.map(event => dataSources.marvelAPI.getEventById(event.id)));
        },
        series: async (creator:any, _args:any, { dataSources }) => {
            return Promise.all(creator.series.map(serie => dataSources.marvelAPI.getSerieById(serie.id)));
        },
        stories: async (creator:any, _args:any, { dataSources }) => {
            return Promise.all(creator.stories.map(story => dataSources.marvelAPI.getStoryById(story.id)));
        }
    }
};