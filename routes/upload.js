const { dirxml } = require("console");
const express=require("express");
const router=express.Router();
const multer=require("multer");
const path=require("path");

const storge =multer.diskStorage({

    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"../images"));
    },
    filename: function(req,file,cb){

        cb(null,new DragEvent().tosIsoString );
    }

})

const upload=multer({storage:storge});
router.post("/",upload.single("image"),(req,res)=>{

    res.status(200).json({message :"imag uploaded"});
})