export const typeDef = `
    type Image {
        "The directory path of to the image."
        path: String
        "The file extension for the image."
        extension: String
        "resource URI"
        resourceURI(size: ImageSizes = FULL_SIZE): String
    }

    enum ImageSizes {
        "50x75px"
        PORTRAIT_SMALL
        "100x150px"
        PORTRAIT_MEDIUM
        "150x225px"
        PORTRAIT_XLARGE
        "168x252px"
        PORTRAIT_FANTASTIC
        "300x450px"
        PORTRAIT_UNCANNY
        "216x324px"
        PORTRAIT_INCREDIBLE
        "65x45px"
        STANDARD_SMALL
        "100x100px"
        STANDARD_MEDIUM	
        "140x140px"
        STANDARD_LARGE
        "200x200px"
        STANDARD_XLARGE	
        "250x250px"
        STANDARD_FANTASTIC	
        "180x180px"
        STANDARD_AMAZING	
        "120x90px"
        LANDSCAPE_SMALL	  
        "175x130px"
        LANDSCAPE_MEDIUM	
        "190x140px"
        LANDSCAPE_LARGE	
        "270x200px"
        LANDSCAPE_XLARGE	
        "250x156px"
        LANDSCAPE_AMAZING	
        "464x261px"
        LANDSCAPE_INCREDIBLE	
        "full image, constrained to 500px wide"
        DETAIL
        "full-size image (no variant descriptor in URL)"
        FULL_SIZE
    }
`;