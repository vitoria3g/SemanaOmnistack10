const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){

        const {latitude, longitude, techs} = request.query;
        const techsArray = parseStringAsArray(techs);
        
        const devs = await Dev.find({
            techs:{
                   //in é um operador logico
                    $in: techsArray //usuário que tenham essas tecnologias
                },
            location:{
                //near é um operador que permite encontrar objs pertos de certa localização
                $near: {
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude,latitude]  
                    },
                    $maxDistance: 10000, //numa localização maxima de 10km
                },
            },
        });
        return response.json({devs});
    }
}