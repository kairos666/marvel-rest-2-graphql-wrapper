export const typeDef = `
    type Query {
        character(id: ID!): Character
        comic(id: ID!): Comic
        story(id: ID!): Story
        serie(id: ID!): Serie
        event(id: ID!): Event
        creator(id: ID!): Creator
        characters(limit: Int, offset: Int, orderBy: String): CharacterList!
        comics(limit: Int, offset: Int, orderBy: String): ComicList!
        stories(limit: Int, offset: Int, orderBy: String): StoryList!
        series(limit: Int, offset: Int, orderBy: String): SerieList!
        events(limit: Int, offset: Int, orderBy: String): EventList!
        creators(limit: Int, offset: Int, orderBy: String): CreatorList!
    }
`;