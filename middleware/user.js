module.exports =function(req,res,next){
    if(req.session === null){
        console.log('user is not authenticated')
    }
    else {
        next();
        console.log('user is authenticated');
    }
}