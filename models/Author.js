const mongoose=require("mongoose");
const joi = require("joi");
const AuthorSchema=new mongoose.Schema({

      firstName:{
          type:String ,
          required:true,
          trim:true,
          minlength:3,
          maxlength:200
  
      },
      lastName:{
        type:String ,
        required:true,
        trim:true,
        minlength:3,
        maxlength:200

    },
    nationality:{
        type:String ,
        required:true,
        trim:true,
        minlength:3,
        maxlength:200

    },
    image:{
        type:String ,
        default:"default url..."
    }

},{
   timestamps:true 
});

function validateUpdateauthor(obj) {
    const schema = joi.object({
        firstName: joi.string().trim().min(2).max(100),
        lastName: joi.string().trim().min(2).max(100),
        nationality: joi.string().trim().min(2).max(200),
        image: joi.string().min(3).max(600)


    });
    return schema.validate(obj);


}
function validateCreatauthor(obj) {
    const schema = joi.object({
        firstName: joi.string().trim().min(2).max(100).required(),
        lastName: joi.string().trim().min(2).max(100).required(),
        nationality: joi.string().trim().min(2).max(200).required(),
        image: joi.string().min(3).max(600)

    });
    return schema.validate(obj);
}

const Author=mongoose.model("Author",AuthorSchema);

module.exports={Author,validateCreatauthor,validateUpdateauthor};