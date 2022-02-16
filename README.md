# Simple_NodeJS_API
Uma simples API de cadastro de games feita em nodejs com express e sequelize
## Endpoints
### GET /games
Endpoint responsável por retornar a listagem de todos os games cadastrados
#### Parâmetros
Nenhum
### Respostas
### OK! 200
retorna a listagem de games
Exemplo de resposta:
```
[
    {
        "id": 1,
        "title": "CS:GO",
        "year": 2012,
        "price": 35,
    },
    {
        "id": 3,
        "title": "Call of Duty Vanguard",
        "year": 2021,
        "price": 60
    },
    {
        "id": 4,
        "title": "Call of Duty Black Ops",
        "year": 2010,
        "price": 60
    }
    }
    ]
```
### Falha na autenticação! 401
Indica que ocorreu uma falha no processo de autenticação da requisição.
Motivos: Token inválido, Token expirado.

Exemplo de resposta:
```
{
    "err": "Token Inválido"
}
```

POST /game
Endpoint responsável por inserir um game no banco de dados
#### Parâmetros
title, price, year

Exemplo de requisição:
´´´
{
    "title": "Call of Duty Black Ops",
    "price": 60,
    "year": 2014
}
```
### Respostas
### OK! 200

### Falha na autenticação! 401
Indica que ocorreu uma falha no processo de autenticação da requisição.
Motivos: Token inválido, Token expirado.

GET /game/:id
Endpoint responsável por buscar um game especifico no banco de dados atráves do seu id
#### Parâmetros
id
localhost:8282/game/4

### Respostas
### OK! 200

´´´
{
    "game": {
        "id": 4,
        "title": "Call of Duty Black Ops",
        "year": 2010,
        "price": 60,
        "createdAt": "2022-02-14T22:49:05.000Z",
        "updatedAt": "2022-02-14T23:03:38.000Z"
    },
    "_links": [
        {
            "href": "http://localhost:8282/game/4",
            "method": "PUT",
            "rel": "update_game"
        },
        {
            "href": "http://localhost:8282/game/4",
            "method": "DELETE",
            "rel": "delete_game"
        },
        {
            "href": "http://localhost:8282/game/4",
            "method": "GET",
            "rel": "get_game"
        },
        {
            "href": "http://localhost:8282/auth",
            "method": "POST",
            "rel": "login"
        }
    ]
}
```

### Falha na autenticação! 401
Indica que ocorreu uma falha no processo de autenticação da requisição.
Motivos: Token inválido, Token expirado.

PUT /game/:id
Endpoint responsável por editar um game especifico atráves do seu id
#### Parâmetros
id, title, price, year

Exemplo:
```
{
    "title": "NFS",
    "price": 60,
    "year": 2010
}
```

