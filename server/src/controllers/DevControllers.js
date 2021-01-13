const axios              = require('axios'); 
const Dev                = require('../models/Dev'); 
const parseStringAsArray = require('../utils/parseStringAsArray'); //instanciando a função de transformar string em array


module.exports ={

async index (request,response){
    const devs = await Dev.find(); //buscando os dados do banco
    return response.json(devs); 
},
  
async create (request, response){
    const { github_username, techs, latitude, longitude } = request.body; 
    let dev = await Dev.findOne({github_username}); 
    
    if(!dev){ 
      //fazendo requisição a API do gitHub
      const ApiResponse = await axios.get(`https://api.github.com/users/${github_username}`); //'await' aguarde isso finalizar
      const {name = login, avatar_url, bio} = ApiResponse.data  
      //transformando a string em array através da função em parseStringAsArray 
      const techsArray = parseStringAsArray(techs)  
    
      const location = { //mesmo nome e estrutura de dados do PointSchema
          type: 'Point',
          coordinates: [longitude,latitude] //precisa ser nessa ordem 
      }  
      //Cadastrando o usuário
       dev = await Dev.create({
                               github_username, 
                               name,
                               avatar_url,
                               bio,
                               techs: techsArray,
                               location,
                            });
    }

    return response.json(dev); 
 }

};