const express = require('express');
const routes = require('./routes');

const server = express(); // A variável server recebe express()

server.use(express.json()); // o server é a instância do express, o use é um plugin já importado 
                            // que estamos adicionando pra ele (express) e passamos pra ele o json
server.use(routes);
                            
// Porta utilizada pelo servidor
server.listen(3000)

// Para executar a aplicação, digite: yarn dev