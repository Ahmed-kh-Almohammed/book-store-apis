const asyncHandler = require("express-async-handler");
const { Author, validateUpdateauthor, validateCreatauthor } = require("../models/Author");




/*
  @desc GEt all authors 
  @rout /api/authors
  @method GET
  @access Public
*/
const getAuthors = asyncHandler(
    async (req, res) => {

        const authorsList = await Author.find().sort({ firstName: -1 });
        res.status(200).json(authorsList);


    }
);


/*
  @desc GEt a author by id  
  @rout /api/authors/:id
  @method GET
  @access Public
*/

const getAuthorById = asyncHandler(
    async (req, res) => {
        const author = await Author.findById(req.params.id);
        if (author)
            res.status(200).json(author);
        else res.status(404).json({ message: "error 404 author not found" });

    }
);

/*
@desc Creat a author 
@rout /api/authors/
@method Post
@access private(only Admin)
*/
const creatNewAuthor = asyncHandler(
    async (req, res) => {
        const { error } = validateCreatauthor(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image


        });
        const result = await author.save()
        res.status(201).json(result);

    }
);

/*
@desc update  a author 
@rout /api/authors/
@method put
@access private(only Admin)
*/

const updateAuthor=asyncHandler(
    async (req, res) => {
        const { error } = validateUpdateauthor(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const result = await Author.findByIdAndUpdate(req.params.id, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nationality: req.body.nationality,
                image: req.image
            }
        }, { new: true })
        res.status(200).json(result);


    }
);


/*
@desc DElETE a author 
@rout /api/authors/
@method DELETE
@access private(only Admin)
*/

const deleteAuthor= asyncHandler(
    async (req, res) => {
        const author = await Author.findById(req.params.id);
        if (author) {
            await Author.findByIdAndDelete(req.params.id);
            res.status(201).send("author DElETED");
        }
        else res.status(404).send("author not found");
    }
);
module.exports = { getAuthors, getAuthorById, creatNewAuthor,updateAuthor ,deleteAuthor};