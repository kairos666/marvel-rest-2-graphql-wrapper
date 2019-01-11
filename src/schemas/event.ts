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
        "A resource list containing the comics in this event."
        comics: [Comic]!
        "A resource list containing the stories in this event."
        stories: [Story]!
        "A resource list containing the series in this event."
        series: [Serie]!
        "A resource list containing the characters in this event."
        characters: [Character]!
        "A resource list containing the creators in this event."
        creators: [Creator]!
        "event which follows this event."
        next: Event
        "event which preceded this event."
        previous: Event
    }
`;