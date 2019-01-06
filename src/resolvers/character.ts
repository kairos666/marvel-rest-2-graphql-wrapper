const mockDB = [
    { id: "character01", name: "Jackass man", description: "this guy is the Al Bundy of super heroes", thumbnail: { path: "image/path/file", extension: "png" }, comics: ["comic01", "comic03"] },
    { id: "character02", name: "the strange doctor", description: "The eponymous guy", thumbnail: { path: "image/path/file", extension: "png" }, comics: ["comic01"] },
    { id: "character03", name: "Tarantula man", description: "same as spider man but bigger", thumbnail: { path: "image/path/file", extension: "png" }, comics: ["comic02"] },
    { id: "character04", name: "Spider man", description: "the guy that sticks to walls", thumbnail: { path: "image/path/file", extension: "png" }, comics: ["comic02"] }
];

export const resolver = {
    Query: {
        character: () => mockDB
    }
};