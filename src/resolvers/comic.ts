const mockDB = [
    { id: "comic01", title: "Docteur Strange", issueNumber: 3, description: "some comic book", format: "paper", pageCount: 233, thumbnail: { path: "image/path/file", extension: "png" }, characters: ["character01", "character02"] },
    { id: "comic02", title: "Amazing Tarantula man", issueNumber: 345, description: "some other comic book", format: "hard cover", pageCount: 103, thumbnail: { path: "image/path/file", extension: "png" }, characters: ["character04", "character03"] },
    { id: "comic03", title: "The invincible Jackass man", issueNumber: 5, description: "yet another comic book", format: "hard cover", pageCount: 2, thumbnail: { path: "image/path/file", extension: "png" }, characters: ["character01"] }
];

export const resolver = {
    Query: {
        comic: () => mockDB
    }
};