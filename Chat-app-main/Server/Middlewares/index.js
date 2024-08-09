function testMiddleware(filename) {
    return (req, res, next) => {
        next();
    }
}

function jwtCheck(){
    return(req,res,next)=>{
        
    }
}

export { testMiddleware };
