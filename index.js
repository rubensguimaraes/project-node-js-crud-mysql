const express = require('express');

const server = express(); // A variável server recebe express()
                          // os parenteses indicam que o express exporta uma função,
                          // como foi visto nas notas anteriores de aula.
                          // Ou seja, estamos chamando a função do express.

server.use(express.json()); // o server é a instância do express, o use é um plugin já importado 
                            // que estamos adicionando pra ele (express) e passamos pra ele o
                            // express.json()

/* Como estamos criando uma API ou um servidor, precisamos que ele ouça alguma porta,
   definiremos esta porta com o valor 3000, como pode ser visto na linha server.listen(3000). 
   Ao executarmos o localhost na porta 3000 no navegador, nosso servidor será chamado. 
*/
/* Vamos já criar nossa 1a rota para vermos o funcionamento da aplicação. Vamos iniciar
   utilizando o método get, por ser mais fácil para testarmos no navegador.
   Para executar a aplicação, devemos no navegador chamar o seguinte: localhost:3000/teste
*/
/*
server.get('/teste', () => {
  console.log('testando..');
})
*/
/* Você vai observar que no navegador não irá aparecer nada, no entanto, na console (no terminal),
   como pode ser visto abaixo, irá aparecer o que mandamos exibir
*/
/*----------------------------------------------------------------------------------------------*/
/*
Nesta nova implementação, utilizaremos o req e o res.
Toda função passada como 2o parâmetro do server.get, que indica como a rota será manipulada,
sempre receberá os parâmetros req e res.
O req representa todos os dados da requisição (queryparms (utilizam o ?) ou routparms ( utilizam o /1)).
O res possui as informações que serão retornadas como resposta para o cliente (front-end).
O exemplo abaixo utilizará apenas o res, para retornarmos uma resposta ao nosso cliente.
*/
/*
server.get('/teste', (req, res) => {
  return res.send('Hello world');
})
*/
/*
Como a ideia de um back-end (a API a ser desenvolvida) é de sempre retornar uma estrutura de dados (um json), 
vamos portanto implementar isto no nosso código.
*/
// CRUD - Create, Read, Update, Delete
const users = ['Matheus', 'Eliete', 'Marina'];

//Middleware global (interceptador)
server.use((req, res, next) => {
  console.time('request');
  console.log(`Metodo: ${req.method}, URL ${req.url}`);

  next(); //next executa a requisição (caso não utilizado é encerrada a requisição)
          //é possivel executar comandos depois do next
  console.timeEnd('request');
});

//Middleware local (verificar se existe name na requisição)
function checkUserNameExists(req, res, next) {
  if (!req.body.name) { // Vai no corpo da requisição verificar se existe a informação name (nome do usuário)
                        // caso não encontre, será retornado ao usuário um erro 400 com uma mensagem
    return res.status(400).json({ error: 'User name is required' });
  }
  return next(); // Chama o middleware da rota normalmente
}

//Middleware local (verificar se existe usuario)
function checkuserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user; // Estamos adicionando uma nova variável dentro do req com o valor de user

  return next();
}

/**
 * ROTAS get, post, put e dele a seguir 
 */

//Listar todos os usuario
server.get('/users', (req, res) => {
  return res.json(users);
})

//Listar um usuario
server.get('/users/:index', checkuserInArray, (req, res) => { // Espera-se que a rota seja localhost:3000/users/3
  return res.json(req.user); // Aqui exibiremos o id capturado na rota
})

//Cadastrar usuario
//request body
server.post("/users", checkUserNameExists, (req, res) => {
  const { name } = req.body;

  users.push(name); // Insere o usuário no vetor
 
  return res.json(users);
});

//Editar Um usuario
server.put(
  "/users/:index", checkuserInArray, checkUserNameExists, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name; // Substitui no vetor o nome que está na posição do 
                         // index passado pelo nome passado no corpo da requisição

    return res.json(users);
  }
);

//Excluir um usuario
server.delete("/users/:index", checkuserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1); // O método splice percorre o vetor até o index e 
                          // e exclui a partir daquela posição o número de 
                          // posições passada no segundo parâmetro.
  return res.send();
});

// Porta utilizada pelo servidor
server.listen(3000)

// Para executar a aplicação, digite: yarn dev