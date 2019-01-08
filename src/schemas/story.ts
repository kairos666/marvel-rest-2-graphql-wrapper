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
        "A resource list containing comics in which this story takes place."
        comics: [Comic]
        # series	SeriesList	"A resource list containing series in which this story appears."
        # events	EventList	"A resource list of the events in which this story appears."
        "A resource list of characters which appear in this story."
        characters: [Character]
        # creators	CreatorList	"A resource list of creators who worked on this story."
        "Comic in which this story was originally published."
        originalIssue: Comic
    }
`;