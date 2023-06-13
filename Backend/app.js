// Importation express, Helmet et mongoose

const express = require ('express');
const mongoose = require ('mongoose');

//Importations des routes
const usersRoutes = require ('./routes/users.js');
const saucesRoutes = require('./routes/sauce.js');
// Sécurisation API
const helmet = require('helmet');
app.use(helmet());




/*  Accès aux variables d'environnement*/
const path = require ('path');
require('dotenv').config();
/*  Accès au chemin Mongodb*/

mongoose.connect(process.env.DB_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !',error));

const app = express();
app.use(express.json());


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
app.use("/api/sauces" ,saucesRoutes);
app.use("/api/auth", usersRoutes);
app.use("/images", express.static(path.join(__dirname, "Images")));
module.exports = app;