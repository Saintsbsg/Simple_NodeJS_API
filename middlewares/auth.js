const jwt = require("jsonwebtoken");
const jwtSecret = "sdmffmwrpfoeqrmfpo4302@343e";

function auth(req, res, next){

    const authToken = req.headers['authorization'];
    if(authToken != undefined){
        const bearer = authToken.split(' ');
        let token = bearer[1];
        jwt.verify(token, jwtSecret, (err, data) =>{
            if(err){
                res.status(401);
                res.json({err: "Token Inválido"})
            }else{
     
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email}
                next();
            }
        });
    }else{
        res.status(401);
        res.json({err: "Token inválido"});
    }
    
}

module.exports = auth;