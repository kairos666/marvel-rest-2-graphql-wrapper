export const resolver = {
    Query: {
        series: () => null,
        serie: async (_source:any, { id }, { dataSources }) => {
            return dataSources.marvelAPI.getSerieById(id);
        }
    },
    Serie: {
        comics: async (serie:any, _args:any, { dataSources }) => {
            return Promise.all(serie.comics.map(comic => dataSources.marvelAPI.getComicById(comic.id)));
        },
        characters: async (serie:any, _args:any, { dataSources }) => {
            return Promise.all(serie.characters.map(character => dataSources.marvelAPI.getCharacterById(character.id)));
        },
        events: async (serie:any, _args:any, { dataSources }) => {
            return Promise.all(serie.events.map(event => dataSources.marvelAPI.getEventById(event.id)));
        },
        creators: async (serie:any, _args:any, { dataSources }) => {
            return Promise.all(serie.creators.map(creator => dataSources.marvelAPI.getCreatorById(creator.id)));
        },
        stories: async (serie:any, _args:any, { dataSources }) => {
            return Promise.all(serie.stories.map(story => dataSources.marvelAPI.getStoryById(story.id)));
        },
        next: async (serie:any, _args:any, { dataSources }) => {
            return (serie.next !== null) ? dataSources.marvelAPI.getSerieById(serie.next) : null;
        },
        previous: async (serie:any, _args:any, { dataSources }) => {
            return (serie.previous !== null) ? dataSources.marvelAPI.getSerieById(serie.previous) : null;
        }
    }
};