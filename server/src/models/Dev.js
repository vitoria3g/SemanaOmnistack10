const mongoose = require('mongoose'); 
const PointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({

      name: String,
      github_username: String,
      bio: String,
      avatar_url: String,
      techs:[String],  
      location:{
          type:PointSchema, //recebendo o que foi criado em ./utils/PointSchema
          index: '2dsphere' //toda geolocalização precisa de um indice, isso é como os pontos x e y do grafico
      }
      
});

module.exports = mongoose.model('Dev', DevSchema);