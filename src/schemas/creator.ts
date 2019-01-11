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
        "A resource list containing the comics which feature work by this creator."
        comics: [Comic]!
        "A resource list containing the stories which feature work by this creator."
        stories: [Story]!
        "A resource list containing the series which feature work by this creator."
        series: [Serie]!
        "A resource list containing the events which feature work by this creator."
        events: [Event]!
    }
`;