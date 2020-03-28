const express = require('express');

const EstiloController = require('./controllers/EstiloController');

const routes = express.Router();

//Middleware global (interceptador)
routes.use((req, res, next) => {
  console.time('request');
  console.log(`Metodo: ${req.method}, URL ${req.url}`);

  next(); //next executa a requisição (caso não utilizado é encerrada a requisição)
          //é possivel executar comandos depois do next
  console.timeEnd('request');
});

//Middleware local (verificar se existe name na requisição)
function checkUserNameExists(req, res, next) {
  if (!req.body.nome) { // Vai no corpo da requisição verificar se existe a informação nome (nome do estilo)
                        // caso não encontre, será retornado ao usuário um erro 400 com uma mensagem
    return res.status(400).json({ error: 'Nome do Estilo é obrigatório!' });
  }
  return next(); // Chama o middleware da rota normalmente
}

//Middleware local (verificar se existe codigo informado)
function checkuserInArray(req, res, next) {
  //const user = users[req.params.index];
  //if (!user) {
  //  return res.status(400).json({ error: "User does not exists" });
  //}

  //req.user = user; // Estamos adicionando uma nova variável dentro do req com o valor de user

  return next();
}

//Editar Um usuario
routes.put(
  "/users/:index", checkuserInArray, checkUserNameExists, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name; // Substitui no vetor o nome que está na posição do 
                         // index passado pelo nome passado no corpo da requisição

    return res.json(users);
  }
);

//Excluir um usuario
routes.delete("/users/:index", checkuserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1); // O método splice percorre o vetor até o index e 
                          // e exclui a partir daquela posição o número de 
                          // posições passada no segundo parâmetro.
  return res.send();
});

// CRUD - Create, Read, Update, Delete

/**
 * ROTAS get, post, put e delete referentes aos estilos a seguir 
 */

//Cadastrar estilo
//request body
routes.post("/estilos", checkUserNameExists, EstiloController.create);

//Listar todos os estilos
routes.get('/estilos', EstiloController.index)

//Listar um estilo
routes.get('/estilos/:codigo', checkuserInArray, EstiloController.indexOne)

module.exports = routes;