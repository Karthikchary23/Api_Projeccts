const express = require("express");
const database = require("./dataBase.js");
const booky = express();

// Route to get all books
booky.get("/books", (req, res) => {
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
    const booksByAuthor = database.books.filter((books) => books.authorName.includes(authorName));
    if (booksByAuthor.length === 0) {
        return res.json({ error: `No books found by author ${authorName}` });
    }
    return res.json({ books: booksByAuthor });
});

// Route to get all authors
booky.get("/authors", (req, res) => {
    return res.json({ authors: database.author });
});

// Route to get author details by author name
booky.get("/authors/:authorName", (req, res) => {
    const authorName = req.params.authorName;
    const author = database.author.find(author => author.authorName === authorName);
    if (!author) {
        return res.json({ error: `No author found with name ${authorName}` });
    }
    return res.json({ author });
});
//author details based on isbn

booky.get("/author/book/:isbn",(req,res)=>
{
    const getAuthorDetails=database.author.filter((author)=>author.books.includes(req.params.isbn));
    if(getAuthorDetails.length===0)
    {
        return res.json({error:`no author details found based on ${res.params.isbn} ID`});
    }
    return res.json({getAuthorDetails})

});
//publications

booky.get("/publication",(req,res)=>
{
    return res.json({publications:database.publication})
})
//publication Id
booky.get("/publication/:id",(req,res)=>
{
    const getPublicationDetails=database.publication.filter((publication)=>publication.id ===parseInt(req.params.id));
    if(getPublicationDetails.length===0)
    {
        return res.json({ error: `No publication details found based on ${req.params.id}` });
    }
    return res.json({ publication: getPublicationDetails[0] });
});



booky.listen(3000, () => {
    console.log("Server running on port 3000");
});
