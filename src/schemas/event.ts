export const typeDef = `
    """
    Comics can also be a part of an event, which is a big, 
    universe-changing storyline. A comic's appearance in an event
     is often independent of its membership in a series.
    """
    type Event {
        "The unique ID of the event resource."
        id: ID
        "The title of the event."
        title: String
        "A description of the event."
        description: String
        "The date of publication of the first issue in this event."
        start: String
        "The date of publication of the last issue in this event."
        end: String
        "The representative image for this event."
        thumbnail: Image
        "character list related to this event"
        characters(limit: Int, offset: Int, orderBy: String): CharacterList!
        "creator list related to this event"
        creators(limit: Int, offset: Int, orderBy: String): CreatorList!
        "comic list related to this event"
        comics(limit: Int, offset: Int, orderBy: String): ComicList!
        "story list related to this event"
        stories(limit: Int, offset: Int, orderBy: String): StoryList!
        "serie list related to this event"
        series(limit: Int, offset: Int, orderBy: String): SerieList!
        "event which follows this event."
        next: Event
        "event which preceded this event."
        previous: Event
    }

    """
    A list of event resources
    """
    type EventList {
        "Skipped the specified number of resources in the result set."
        offset: Int
        "Limited the result set to the specified number of resources."
        limit: Int
        "total number of available resources"
        total: Int
        "number of results in this set"
        count: Int
        "actual list of comics"
        results: [Event]!
    }
`;