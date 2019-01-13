export const typeDef = `
    type Query {
        character(id: ID!): Character
        comic(id: ID!): Comic
        story(id: ID!): Story
        serie(id: ID!): Serie
        event(id: ID!): Event
        creator(id: ID!): Creator
        characters: CharacterList!
        comics: ComicList!
        stories: StoryList!
        series: SerieList!
        events: EventList!
        creators: CreatorList!
    }
`;