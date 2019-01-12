export const typeDef = `
    """
    Characters are people and organizations which 
    appear in comics. They are also assigned to 
    stories initially and bubbled up to issues, 
    series and events.
    """
    type Character {
        "The unique ID of the character resource."
        id: ID
        "The name of the character."
        name: String
        "A short bio or description of the character."
        description: String
        "The representative image for this character."
        thumbnail: Image
        "A resource list containing comics which feature this character."
        comics(limit: Int, offset: Int, orderBy: String): ComicList!
        "A resource list of stories in which this character appears."
        stories(limit: Int, offset: Int, orderBy: String): StoryList!
        "A resource list of events in which this character appears."
        events(limit: Int, offset: Int, orderBy: String): EventList!
        "A resource list of series in which this character appears."
        series(limit: Int, offset: Int, orderBy: String): SerieList!
    }

    """
    A list of character resources
    """
    type CharacterList {
        "Skipped the specified number of resources in the result set."
        offset: Int
        "Limited the result set to the specified number of resources."
        limit: Int
        "total number of available resources"
        total: Int
        "number of results in this set"
        count: Int
        "actual list of comics"
        results: [Character]!
    }
`;