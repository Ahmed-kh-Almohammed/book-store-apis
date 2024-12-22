const joi = require("joi");
const asyncHandler = require("express-async-handler");

const { validateUpdateBook, validateCreatBook, Book } = require("../models/book");


/*
  @desc GEt all books 
  @rout /api/books
  @method GET
  @access Public
*/

const getAllBooks=asyncHandler(async (req, res) => {
    const books = await Book.find().populate("author");
    res.status(200).json(books);
});


/*
  @desc GEt a book by id  
  @rout /api/books/:id
  @method GET
  @access Public
*/
const getBookById= asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author");
    if (book)
        res.status(200).json(book);
    else res.status(404).json({ message: "error 404 book not found" });
});

/*
@desc creat  a book 
@rout /api/books/
@method Post
@access private(only admin)
*/

const createBook=asyncHandler(async (req, res) => {
    const { error } = validateCreatBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover

    });
    const result = await book.save();
    res.status(201).json(result);
});

/*
@desc Update a book 
@rout /api/books/
@method put
@access private(only admin)
*/

const updateBook=asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const updatedbook = await Book.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover
        }
    }, { new: true });
    if (updatedbook) {
        res.status(201).json(updatedbook);
    }
    else res.status(404).send("book not found");
});


/*
@desc DElETE a book 
@rout /api/books/
@method DELETE
@access private(only admin)
*/
const deleteBook=asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        const result=await Book.findByIdAndDelete(book);
        res.status(201).json(result);
    }
    else res.status(404).send("book not found");
})

module.exports={getAllBooks,getBookById,createBook,updateBook,deleteBook};