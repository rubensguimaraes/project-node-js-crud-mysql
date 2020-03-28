const connection = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { nome } = req.body;

    console.log(nome);
  
    await connection('estilo').insert({
      nome
    })
    return res.json({ nome });
  },

  async index(req, res) {

    const estilos = await connection('estilo').select('*');
    
    return res.json(estilos)
  }, 
   
  async indexOne(req, res) { // Espera-se que a rota seja localhost:3000/users/3

    const { codigo } = req.params;

    console.log(req);

    const estilo = await connection('estilo').whereRaw('codigo = ?', codigo);

    return res.json(estilo); // Aqui exibiremos o id capturado na rota
  } 
   
}