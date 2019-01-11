export const resolver = {
    Query: {
        stories: () => null,
        story: async (_source:any, { id }, { dataSources }) => {
            return dataSources.marvelAPI.getStoryById(id);
        }
    },
    Story: {
        comics: async (story:any, _args:any, { dataSources }) => {
            return Promise.all(story.comics.map(comic => dataSources.marvelAPI.getComicById(comic.id)));
        },
        originalIssue: async (story:any, _args:any, { dataSources }) => {
            return (story.originalIssue !== null) ? dataSources.marvelAPI.getComicById(story.originalIssue) : null;
        },
        characters: async (story:any, _args:any, { dataSources }) => {
            return Promise.all(story.characters.map(character => dataSources.marvelAPI.getCharacterById(character.id)));
        },
        series: async (story:any, _args:any, { dataSources }) => {
            return Promise.all(story.series.map(serie => dataSources.marvelAPI.getSerieById(serie.id)));
        },
        events: async (story:any, _args:any, { dataSources }) => {
            return Promise.all(story.events.map(event => dataSources.marvelAPI.getEventById(event.id)));
        },
        creators: async (story:any, _args:any, { dataSources }) => {
            return Promise.all(story.creators.map(creator => dataSources.marvelAPI.getCreatorById(creator.id)));
        }
    }
};