export const resolver = {
    Query: {
        comics: () => [],
        comic: async (_source:any, { id }, { dataSources }) => {
            return dataSources.marvelAPI.getComicById(id);
        }
    },
    Comic: {
        characters: async (comic:any, _args:any, { dataSources }) => {
            return Promise.all(comic.characters.map(character => dataSources.marvelAPI.getCharacterById(character.id)));
        },
        stories: async (comic:any, _args:any, { dataSources }) => {
            return Promise.all(comic.stories.map(story => dataSources.marvelAPI.getStoryById(story.id)));
        },
        series: async (comic:any, _args:any, { dataSources }) => {
            return Promise.all(comic.series.map(serie => dataSources.marvelAPI.getSerieById(serie.id)));
        },
        events: async (comic:any, _args:any, { dataSources }) => {
            return Promise.all(comic.events.map(event => dataSources.marvelAPI.getEventById(event.id)));
        },
        creators: async (comic:any, _args:any, { dataSources }) => {
            return Promise.all(comic.creators.map(creator => dataSources.marvelAPI.getCreatorById(creator.id)));
        }
    }
};