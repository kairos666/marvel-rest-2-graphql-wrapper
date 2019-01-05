export const typeDef = `
    """
    Characters are people and organizations which 
    appear in comics. They are also assigned to 
    stories initially and bubbled up to issues, 
    series and events.
    """
    type Character {
        "The unique ID of the character resource."
        id: ID
        "The name of the character."
        name: String
        "A short bio or description of the character."
        description: String
        "The representative image for this character."
        thumbnail: Image
        "A resource list containing comics which feature this character."
        comics: [Comic]
        # stories: ResourceList
        # events: ResourceList
        # series: ResourceList
    }
`;