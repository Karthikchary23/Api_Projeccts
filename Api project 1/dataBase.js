const books = [
    {
        ISBN: "12345Books",
        title: "Tesla",
        pubDate: "2004-01-23",
        language: "en",
        numpage: 250,
                authorName: ["karthik", "chary"],

        authorID: [1,2],
        publications: 1,
        category: ["tech", "education", "comedy"]
    }
];

const author = [
    {
        authorName: "karthik",
        authorId: 1,
        books: ["12345Books", "spaceX"]
    },
    {
        authorName: "chary",
        authorId: 2,
        books: ["12345Books"]
    }
];

const publication = [
    {
        id: 1,
        name: "writex",
        books: ["12345Books"]
    }
];

module.exports = { books, author, publication };
