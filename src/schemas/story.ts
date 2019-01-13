export const typeDef = `
    """
    Comics are made up of stories, which are indivisible 
    components of comics. Most comics have two stories - 
    a cover and an interior story - but many, such 
    as anthology comics and collections, will have more
    """
    type Story {
        "The unique ID of the story resource."
        id: ID
        "The story title."
        title: String
        "A short description of the story."
        description: String
        "The story type e.g. interior story, cover, text story."
        type: String
        "The representative image for this story."
        thumbnail: Image
        "character list related to this story"
        characters(limit: Int, offset: Int, orderBy: String): CharacterList!
        "creator list related to this story"
        creators(limit: Int, offset: Int, orderBy: String): CreatorList!
        "comic list related to this story"
        comics(limit: Int, offset: Int, orderBy: String): ComicList!
        "event list related to this story"
        events(limit: Int, offset: Int, orderBy: String): EventList!
        "serie list related to this story"
        series(limit: Int, offset: Int, orderBy: String): SerieList!
        "Comic in which this story was originally published."
        originalIssue: Comic
    }

    """
    A list of story resources
    """
    type StoryList {
        "Skipped the specified number of resources in the result set."
        offset: Int
        "Limited the result set to the specified number of resources."
        limit: Int
        "total number of available resources"
        total: Int
        "number of results in this set"
        count: Int
        "actual list of comics"
        results: [Story]!
    }
`;