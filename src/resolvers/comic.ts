import mockData from '../mockData.json';

export const resolver = {
    Query: {
        comics: () => mockData.comics,
        comic: (_:any, args:any) => mockData.comics.find(item => (item.id === args.id))
    },
    Comic: {
        characters: (comic:any) => {
            return comic.characters.map(characterId => mockData.characters.find(item => (item.id === characterId)));
        },
        stories: (comic:any) => {
            return comic.stories; // TODO
        }
    }
};