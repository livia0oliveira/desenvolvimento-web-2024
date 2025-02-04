const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')
require('dotenv').config()
const uri = process.env.URI
const client = new MongoClient(uri)
const mydb = client.db('theowlhousewikidb').collection('postagem')
const postagemDAO = require('./postagemDAO')

app.listen(3000, () => {
    console.log("Servidor rodando...")
})

app.get('/all', async (req, res) => {
    const docs = await postagemDAO.getPosts(mydb)
    res.json(JSON.parse(JSON.stringify(docs, null, 2)))
})

app.get('/add/:t/:c', async (req, res) => {
    const doc = {
        titulo: req.params.t,
        conteudo: req.params.c,
    }
    const result = await postagemDAO.insertPost(mydb, doc)
    res.json(result)
})

app.get('/del/:t', async (req, res) => {
    const titulo = {
        titulo: req.params.t
    }
    const result = await postagemDAO.deletePostByTitle(mydb, titulo)
    res.json(result)
})

app.get('/update/:t/:c', async (req, res) => {
    const titulo = {
        titulo: req.params.t
    }
    const new_content = {
        $set : {conteudo: req.params.c}
    }
    const result = await postagemDAO.updateContentByTitle(mydb, titulo, new_content)
    res.json(result)
})