const express  = require('express');
const mongoose = require('mongoose'); 
const cors     = require('cors'); 
const routes   = require('./routes'); 

const app = express(); 

//conexão com o banco de dados mongobd
const uri = 'mongodb<sua_url_mongodb>';
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => console.log('Connected'))
        .catch(err => console.log('Caught', err.stack));

app.use(cors()); 
app.use(express.json()); 
app.use(routes);
app.listen(3333); 