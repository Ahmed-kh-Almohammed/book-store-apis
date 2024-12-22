const express = require("express");

const joi = require("joi");

const connectToDB=require("./config.js/db");
const dotenv = require("dotenv");
const logger = require("./middlewares/logger")
const {notFound,errorHandler}=require("./middlewares/errors");
dotenv.config();

//Connect to DataBase

connectToDB();

///

const app = express();
app.set('view engine','ejs');
app.use(express.json());///change json to js object 
app.use(express.urlencoded({extended:false}));/// 
app.use(logger);
const PORT = process.env.PORT || 5000;

///routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/auth"));
app.use("/api/user",require("./routes/userreg"));
app.use("/api/users",require("./routes/user"));
app.use("/password",require("./routes/password"));
app.use("/api/upload",require("./routes/upload"));

//Error handler middlewares 
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server is runining on   ${process.env.NODE_ENV} mode on PORT ... ${PORT}`));

