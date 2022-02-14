const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Game = require("./models/Games");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connection.authenticate().then(() =>{
    console.log("Conectado ao BD");
}).catch(error =>{
    console.log(error)
});

app.get("/games", (req, res) =>{
    Game.findAll().then(games =>{
        res.json(games);
    })
    res.statusCode = 200;
});

app.post("/game", (req, res) =>{
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

app.get("/game/:id", (req, res) =>{
     if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        Game.findByPk(id).then(game =>{
            res.status(200).json(game);
        }).catch(() =>{
            res.sendStatus(404)
        })
    }

});

app.put("/game/:id", (req, res) =>{
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

app.delete("/game/:id", (req, res) =>{
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


app.listen(8282, () =>{
    console.log("API Rodando");
})