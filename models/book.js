const mongoose=require("mongoose");
const joi = require("joi");
const BookSchema= new mongoose.Schema(
{
    title:{
        type:String,
        required :true,
        trim:true,
        minlength:3,
        maxlength:250
    },
    author:{
         type:mongoose.Schema.Types.ObjectId,
         required:true,
         ref:"Author"
    },
    description:{
        type:String,
        required :true,
        trim:true,
        minlength:5,
    },
    price:{
        type:Number,
        required :true,
        min:0
    },
    cover:{
        type :String ,
        required :true

    }
}


,{timestamps:true});

//Book model
const Book =mongoose.model("Book",BookSchema);


//validate

function validateUpdateBook(obj) {
    const schema = joi.object({
        title: joi.string().trim().min(3).max(100),
        author: joi.string(),
        description : joi.string().trim().min(3),
        price: joi.number().min(0),
        cover : joi.string().valid("soft cover","hard cover")

    });
    return schema.validate(obj);


}

function validateCreatBook(obj) {
    const schema = joi.object({
        title: joi.string().trim().min(3).max(100).required(),
        author: joi.string().required(),
        description : joi.string().trim().min(3).required(),
        price: joi.number().min(0).required(),
        cover : joi.string().valid("soft cover","hard cover").required()

    });
    return schema.validate(obj);
}


module.exports={Book,validateUpdateBook,validateCreatBook};
