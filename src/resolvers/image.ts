export const resolver = {
    Image(path:String, extension:String) {
        return `${path}.${extension}`;
    }
};