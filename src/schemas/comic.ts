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
        "A resource list containing characters appearing in that comic."
        characters(limit: Int, offset: Int, orderBy: String): CharacterList!
        "A resource list containing creators appearing in that comic."
        creators(limit: Int, offset: Int, orderBy: String): CreatorList!
        "A resource list of appearing in that comic appears."
        stories(limit: Int, offset: Int, orderBy: String): StoryList!
        "A resource list of appearing in that comic appears."
        events(limit: Int, offset: Int, orderBy: String): EventList!
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