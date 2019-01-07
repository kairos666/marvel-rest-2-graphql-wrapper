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
        # series: SeriesSummary
        # dates: [ComicDates]
        "The representative image for this comic."
        thumbnail: Image
        "A list of promotional images associated with this comic."
        images: [Image]
        # creators: ResourceList
        "A resource list containing the characters which appear in this comic."
        characters: [Character]!
        "A resource list containing the stories which appear in this comic."
        stories: [Story]
        # events: ResourceList
    }
`;