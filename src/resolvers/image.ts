export const resolver = {
    Image: {
        resourceURI: (_image:any, { size }) => {
            return (size === "FULL_SIZE") ? `${_image.path}.${_image.extension}` : `${_image.path}/${(size as String).toLowerCase()}.${_image.extension}`;
        }
    }
};