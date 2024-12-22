const express = require("express");
const router = express.Router();
const {verifyAdmin}=require("../middlewares/verifyToken");


const {getAuthors,getAuthorById,creatNewAuthor,updateAuthor,deleteAuthor}=require("../controller/authController");


router.route("/").get( getAuthors)
                 .post(verifyAdmin,creatNewAuthor);


router.route("/:id").get(getAuthorById)
                    .put(verifyAdmin, updateAuthor)
                    .delete(verifyAdmin,deleteAuthor)



module.exports = router;