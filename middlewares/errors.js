const notFound=(req,res,next)=>{
    const err=new Error(`Not found ${req.originalUrl}`);
    res.status(404);
    next(err);
}

const errorHandler=(error, req, res, next) => {
    const statusCode = (res.statusCode === 200 ? 500 : res.statusCode);
  res.status(statusCode).json({message:error.message});
 // next();
}

module.exports={notFound,errorHandler};