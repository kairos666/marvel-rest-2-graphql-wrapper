export const typeDef = `
    type Query {
        character(id: ID!): Character
        comic(id: ID!): Comic
        story(id: ID!): Story
        serie(id: ID!): Serie
        event(id: ID!): Event
        creator(id: ID!): Creator
        characters: [Character]
        comics: [Comic]
        stories: [Story]
        series: [Serie]
        events: [Event]
        creators: [Creator]
    }
`;