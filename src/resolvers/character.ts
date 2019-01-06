import mockData from '../mockData.json';

export const resolver = {
    Query: {
        characters: () => mockData.characters,
        character: (_:any, args:any) => mockData.characters.find(item => (item.id === args.id))
    },
    Character: {
        comics: (character:any) => {
            return character.comics.map(comicId => mockData.comics.find(item => (item.id === comicId)));
        },
        stories: (character:any) => {
            return character.stories; // TODO
        }
    }
};