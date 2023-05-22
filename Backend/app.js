const express = require ('express');
const mongoose = require ('mongoose');

/*  Accès au chemin Mongodb*/
const path = require ('path');
require('dotenv').config();
/*  Accès au chemin Mongodb*/

mongoose.connect('mongodb+srv://Piiquante:nOHwbjwRmBbAsGH4@cluster0.k0krtfi.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) =>{
    console.log('requête reçue !');
    next();
}
)
app.use((req, res) =>{
    res.json({ message : 'votre reponse ok'})
})
/*Integration di modele CORS Ces headers permettent :

    d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.). */ 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
module.exports = app;