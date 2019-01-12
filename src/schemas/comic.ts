export const typeDef = `
    """
    Comic issues (or just comics) are the physical
     or digital products that end-users read
    """
    type Comic {
        "The unique ID of the comic resource."
        id: ID
        "The canonical title of the comic."
        title: String
        "The number of the issue in the series (will generally be 0 for collection formats)."
        issueNumber: Int
        "The preferred description of the comic."
        description: String
        "The publication format of the comic e.g. comic, hardcover, trade paperback."
        format: String
        "The number of story pages in the comic."
        pageCount: Int
        "The representative image for this comic."
        thumbnail: Image
        "A list of promotional images associated with this comic."
        images: [Image]
        "A resource list containing the creators associated with this comic."
        creators: [Creator]!
        "A resource list containing the characters which appear in this comic."
        characters: [Character]!
        "A resource list containing the stories which appear in this comic."
        stories: [Story]!
        "A resource list containing the events in which this comic appears."
        events: [Event]!
        "A summary representation of the series to which this comic belongs."
        series: [Serie]!
    }

    """
    A list of comic resources
    """
    type ComicList {
        "Skipped the specified number of resources in the result set."
        offset: Int
        "Limited the result set to the specified number of resources."
        limit: Int
        "total number of available resources"
        total: Int
        "number of results in this set"
        count: Int
        "actual list of comics"
        results: [Comic]!
    }
`;