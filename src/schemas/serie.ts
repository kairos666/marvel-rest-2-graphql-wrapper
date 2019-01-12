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
        "A resource list containing comics in this series."
        comics: [Comic]!
        "A resource list containing stories which occur in comics in this series."
        stories: [Story]!
        "A resource list containing events which take place in comics in this series."
        events: [Event]!
        "A resource list containing characters which appear in comics in this series."
        characters: [Character]!
        "A resource list of creators whose work appears in comics in this series."
        creators: [Creator]!
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