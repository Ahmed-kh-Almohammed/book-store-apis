

const { books } = require("./data");
const { Book } = require("./models/book");
const connectToDB = require("./config.js/db");
require("dotenv").config();

//connect to DataBase 

connectToDB();


const importBooks = async () => {
    
    try {
        await Book.insertMany(books);
        console.log("books are imported");
    } catch (error) {
        console.log("books are not imported there ar an error");
        process.exit(1);
    }

}

const removeBooks = async () => {
    try {
        await Book.deleteMany();
        console.log("books are Deleted");
    } catch (error) {
        console.log("books are not Deleted there ar an error");
        process.exit(1);
    }

}
if(process.argv[2]==="-import"){
             importBooks();
}
else if(process.argv[2]==="-remove"){
            removeBooks();
}
