const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const jwtSecret = "sdmffmwrpfoeqrmfpo4302@343e";
const connection = require("./database/database");
const Game = require("./models/Games");
const User = require("./models/User");
const auth = require("./middlewares/auth")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());


connection.authenticate().then(() =>{
    console.log("Conectado ao BD");
}).catch(error =>{
    console.log(error)
});




app.get("/games", auth, (req, res) =>{
    let HATEOAS = [
        {
            href: "http://localhost:8282/game/:id",
            method: "PUT",
            rel: "update_game"
        },

        {
            href: "http://localhost:8282/game/:id",
            method: "DELETE",
            rel: "delete_game"
        },
        {
            href: "http://localhost:8282/game/:id",
            method: "GET",
            rel: "get_game"
        },

        {
            href: "http://localhost:8282/auth",
            method: "POST",
            rel: "login"
        }
    ]
    Game.findAll().then(games =>{
        res.json({games, _links: HATEOAS});
    })
    res.statusCode = 200;
});

app.post("/game", auth, (req, res) =>{
    let{title, price, year} = req.body;
    Game.create({
        title: title,
        price: price,
        year: year
    }).then(game =>{
         res.sendStatus(200);
    }).catch(() =>{
        res.send("Erro ao inserir dados")
    });
});

app.post("/user", (req, res) =>{
    let{name, email, password} = req.body;
    User.create({
        name: name,
        email: email,
        password: password
    }).then(user =>{
         res.sendStatus(200);
    }).catch(() =>{
        res.send("Erro ao inserir dados")
    });
});

app.get("/game/:id", auth, (req, res) =>{
     if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);

        let HATEOAS = [
            {
                href: "http://localhost:8282/game/"+id,
                method: "PUT",
                rel: "update_game"
            },

            {
                href: "http://localhost:8282/game/"+id,
                method: "DELETE",
                rel: "delete_game"
            },
            {
                href: "http://localhost:8282/game/"+id,
                method: "GET",
                rel: "get_game"
            },
    
            {
                href: "http://localhost:8282/auth",
                method: "POST",
                rel: "login"
            }
        ]
        Game.findByPk(id).then(game =>{
            res.status(200).json({game, _links: HATEOAS});
        }).catch(() =>{
            res.sendStatus(404)
        })
    }

});

app.put("/game/:id", auth, (req, res) =>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        Game.findByPk(id).then(game =>{
            let {title, price, year} = req.body;
            Game.update({
                title: title,
                price: price,
                year:year 
            },
            {
                where:{
                    id: game.id
                }
            }).then(game =>{
                res.sendStatus(200);
            }).catch(() =>{
                res.sendStatus(404);
            })
            
        });
    }
});

app.delete("/game/:id", auth, (req, res) =>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        Game.destroy({
            where:{
                id: id
            }
        }).then(() =>{
            res.sendStatus(200);
        });

    }
});

app.post("/auth", (req, res)=>{
    let{email, password} = req.body;
    if(email != undefined){
        User.findOne({
            where:{
                email: email
            }
        }).then(user =>{
            if(user != undefined){
                if(user.password == password){
                    jwt.sign({id:user.id, email: user.email}, jwtSecret,{expiresIn: '48h'}, (err, token)=>{
                        if(err){
                            res.status(400);
                            res.json({err: "Falha Interna"});
                        }else{
                            res.status(200);
                            res.json({token: token})
                        }
                    });
                }else{
                    res.status(401);
                    res.json({err: "Credenciais inválidas"});
                }
            }else{
                res.sendStatus(404);
                res.json({err: "Email não cadastrado"})
            }
        })
    }else{
        res.status(400);
        res.json({err: "Email inválido"});
    }
})


app.listen(8282, () =>{
    console.log("API Rodando");
})