const express = require('express');
const app = express();
const PORT = 8000;

app.listen(PORT, () => {
    console.log('Hello API on port 8000');
})

app.get('/', function(req, res) {
    res.send('hello, world!');
})

app.get('/v2/:name', function(req, res) {
    res.send('hello, ' + req.params.name)
})

app.get('/v2/:name/json', function(req, res){
    res.json({msg: 'hello, ' +
    req.params.name})
})

app.get('/v3/:lang/:name/json', function(req, res){
    switch (req.params.lang){
        case 'pt-br':
            res.json({msg:'Olá, ' + req.params.name})
            break

        case 'eng':
            res.json({msg: 'Hello, ' + req.params.name})
            break
    }
})

app.get('/v3*', function(req, res) {
    res.status(404).json({error: 'Rota não encontrada'});
});
