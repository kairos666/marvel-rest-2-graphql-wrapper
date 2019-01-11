export const resolver = {
    Query: {
        events: () => null,
        event: async (_source:any, { id }, { dataSources }) => {
            return dataSources.marvelAPI.getEventById(id);
        }
    },
    Event: {
        comics: async (event:any, _args:any, { dataSources }) => {
            return Promise.all(event.comics.map(comic => dataSources.marvelAPI.getComicById(comic.id)));
        },
        characters: async (event:any, _args:any, { dataSources }) => {
            return Promise.all(event.characters.map(character => dataSources.marvelAPI.getCharacterById(character.id)));
        },
        series: async (event:any, _args:any, { dataSources }) => {
            return Promise.all(event.series.map(serie => dataSources.marvelAPI.getSerieById(serie.id)));
        },
        stories: async (event:any, _args:any, { dataSources }) => {
            return Promise.all(event.stories.map(event => dataSources.marvelAPI.getStoryById(event.id)));
        },
        creators: async (event:any, _args:any, { dataSources }) => {
            return Promise.all(event.creators.map(creator => dataSources.marvelAPI.getCreatorById(creator.id)));
        },
        next: async (event:any, _args:any, { dataSources }) => {
            return (event.next !== null) ? dataSources.marvelAPI.getEventById(event.next) : null;
        },
        previous: async (event:any, _args:any, { dataSources }) => {
            return (event.previous !== null) ? dataSources.marvelAPI.getEventById(event.previous) : null;
        }
    }
};