const logger=(eq,res,Next)=>{
    console.log(`${eq.method} ${eq.protocol} ://${eq.get('host')} ${eq.originalUrl} `);
    Next();
}
module.exports=logger;