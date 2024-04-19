const express = require("express");
const bodyParser = require("body-parser");
const database = require("./dataBase.js");
const booky = express();

booky.use(bodyParser.urlencoded({ extended: true }));
booky.use(bodyParser.json());

// Route to get all books
booky.get("/", (req, res) => {
    return res.json({ books: database.books });
});

// Route to get a specific book by ISBN
booky.get("/books/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const book = database.books.find(book => book.ISBN === isbn);
    if (!book) {
        return res.json({ error: `No book found with ISBN ${isbn}` });
    }
    return res.json({ book });
});

// Route to get books by category
booky.get("/books/category/:category", (req, res) => {
    const category = req.params.category;
    const booksInCategory = database.books.filter(book => book.category.includes(category));
    if (booksInCategory.length === 0) {
        return res.json({ error: `No books found in category ${category}` });
    }
    return res.json({ books: booksInCategory });
});

// Route to get author details by author ID
booky.get("/author/:authorId", (req, res) => {
    const authorId = parseInt(req.params.authorId);
    const author = database.author.find(author => author.authorId === authorId);
    if (!author) {
        return res.json({ error: `No author found with ID ${authorId}` });
    }
    return res.json({ author });
});

// Route to get books by author name
booky.get("/books/author/:authorName", (req, res) => {
    const authorName = req.params.authorName;
    const booksByAuthor = database.books.filter(book => book.authorName.includes(authorName));
    if (booksByAuthor.length === 0) {
        return res.json({ error: `No books found by author ${authorName}` });
    }
    return res.json({ books: booksByAuthor });
});

// Route to get all authors
booky.get("/author", (req, res) => {
    return res.json({ authors: database.author });
});

// Route to get author details by author name
booky.get("/author/:authorName", (req, res) => {
    const authorName = req.params.authorName;
    const author = database.author.find(author => author.authorName === authorName);
    if (!author) {
        return res.json({ error: `No author found with name ${authorName}` });
    }
    return res.json({ author });
});

// Route to get author details based on ISBN
booky.get("/author/book/:isbn", (req, res) => {
    const getAuthorDetails = database.author.filter(author => author.books.includes(req.params.isbn));
    if (getAuthorDetails.length === 0) {
        return res.json({ error: `No author details found based on ${req.params.isbn} ID` });
    }
    return res.json({ author: getAuthorDetails });
});

// Route to get all publications
booky.get("/publication", (req, res) => {
    return res.json({ publications: database.publication });
});

// Route to get publication details by ID
booky.get("/publication/:id", (req, res) => {
    const publicationId = parseInt(req.params.id);
    const getPublicationDetails = database.publication.filter(publication => publication.id === publicationId);
    if (getPublicationDetails.length === 0) {
        return res.json({ error: `No publication details found based on ${req.params.id}` });
    }
    return res.json({ publication: getPublicationDetails[0] });
});

// Route to add a new book
booky.post("/book/new", (req, res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({ updatedBooks: database.books });
});
//Route to add new author
booky.post("/author/new", (req, res) => {
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json({ updatedBooks: database.author });
});
//Route to add new publication
booky.post("/publication/new", (req, res) => {
    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json({ updatedBooks: database.publication });
});

booky.listen(3000, () => {
    console.log("Server running on port 3000");
});
