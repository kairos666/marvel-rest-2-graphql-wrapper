export const typeDef = `
    """
    Comics belong to a series, which is a (usually) sequentially number list 
    of comics with the same title and volume. Marvel uses the year of 
    original publication for a series as the volume number.
    """
    type Serie {
        "The unique ID of the series resource."
        id: ID
        "The canonical title of the series."
        title: String
        "A description of the serie."
        description: String
        "The first year of publication for the series."
        startYear: Int
        "The last year of publication for the series (conventionally, 2099 for ongoing series)."
        endYear: Int
        "The age-appropriateness rating for the series."
        rating: String
        "The representative image for this series."
        thumbnail: Image
        "character list related to this serie"
        characters(limit: Int, offset: Int, orderBy: String): CharacterList!
        "creator list related to this serie"
        creators(limit: Int, offset: Int, orderBy: String): CreatorList!
        "comic list related to this serie"
        comics(limit: Int, offset: Int, orderBy: String): ComicList!
        "story list related to this serie"
        stories(limit: Int, offset: Int, orderBy: String): StoryList!
        "event list related to this serie"
        events(limit: Int, offset: Int, orderBy: String): EventList!
        "serie which follows this serie."
        next: Serie
        "serie which preceded this serie."
        previous: Serie
    }

    """
    A list of serie resources
    """
    type SerieList {
        "Skipped the specified number of resources in the result set."
        offset: Int
        "Limited the result set to the specified number of resources."
        limit: Int
        "total number of available resources"
        total: Int
        "number of results in this set"
        count: Int
        "actual list of comics"
        results: [Serie]!
    }
`;