export const typeDef = `
    type Query {
        character(id: ID!): Character
        comic(id: ID!): Comic
        story(id: ID!): Story
        characters: [Character]
        comics: [Comic]
        stories: [Story]
    }
`;