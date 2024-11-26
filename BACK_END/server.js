import express from 'express';
import { PrismaClient } from '@prisma/client'
import e from 'express';
import cors from 'cors';

const prisma = new PrismaClient()
const app = express(); 
app.use(express.json());
app.use(cors());

app.get('/usuarios', async (req, res) => {
    if(req.query){
        const users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        });
        return res.status(200).json(users);
    }else{
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    }
});

app.post('/usuarios', async (req, res) => {
    console.log(req.body);
    
    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        }
    })

    res.status(201).json(req.body);
});

app.put('/usuarios/:id', async (req, res) => {
    console.log(req);
    
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        }
    })

    res.status(201).json(req.body);
});

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({message: 'Usuário deletado com sucesso!'});
}); 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


/*

    Criar API de usuarios:

    - Criar usuario
    - Listar usuarios
    - Atualizar usuario
    - Deletar usuario
    - Buscar usuario por id
    - Buscar usuario por nome


    QUERY PARAMS: http://localhost:3000/usuarios?nome=Joao
    ROUTE PARAMS: http://localhost:3000/usuarios/1
    REQUEST BODY: http://localhost:3000/usuarios 

    GET: Buscar uma informação
    POST: Criar uma informação
    PUT: Alterar uma informação
    DELETE: Deletar uma informação

    TIPOS DE PARÂMETROS:
    - Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
    - Route Params: Parâmetros utilizados para identificar recursos
    - Request Body: Corpo da requisição, utilizado para criar ou alterar recursos

    STATUS DE RESPOSTAS:
    - 200: OK
    - 201: Created

    (Front End)
    - 400: Bad Request
    - 404: Not Found
    
    (Back End)
    - 500: Internal Server
    - 501: Not Implemented
    - 502: Bad Gateway
    - 503: Service Unavailable
    - 504: Gateway Timeout
    - 505: HTTP Version Not Supported
    - 506: Variant Also Negotiates
*/