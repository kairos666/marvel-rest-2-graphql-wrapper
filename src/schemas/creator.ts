export const typeDef = `
    """
    Creators are the people and entities that make comics. 
    They are assigned to the specific comic stories on which they worked, 
    but we bubble up those assignments to the issues, 
    series and events in which the stories appear as a convenience.
    """
    type Creator {
        "The unique ID of the creator resource."
        id: ID
        "The first name of the creator."
        firstName: String
        "The middle name of the creator."
        middleName: String
        "The last name of the creator."
        lastName: String
        "The suffix or honorific for the creator."
        suffix: String
        "The full name of the creator (a space-separated concatenation of the above four fields)."
        fullName: String
        "The representative image for this creator."
        thumbnail: Image
        "comic list related to this creator"
        comics(limit: Int, offset: Int, orderBy: String): ComicList!
        "story list related to this creator"
        stories(limit: Int, offset: Int, orderBy: String): StoryList!
        "event list related to this creator"
        events(limit: Int, offset: Int, orderBy: String): EventList!
        "serie list related to this creator"
        series(limit: Int, offset: Int, orderBy: String): SerieList!
    }

    """
    A list of creator resources
    """
    type CreatorList {
        "Skipped the specified number of resources in the result set."
        offset: Int
        "Limited the result set to the specified number of resources."
        limit: Int
        "total number of available resources"
        total: Int
        "number of results in this set"
        count: Int
        "actual list of comics"
        results: [Creator]!
    }
`;