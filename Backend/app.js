// Importation express, Helmet et mongoose

const express = require ('express');
// Sécurisation API
const helmet = require('helmet');
const mongoose = require ('mongoose');
//const rateLimit = require('express-rate-limit');
//import  rateLimit  depuis  'express-rate-limit'
const rateLimit = require ('express-rate-limit');
const  limiteur  =  rateLimit ( { 
	windowMs : 15  *  60  *  1000 ,  // 15 minutes 
	max : 100 ,  // Limite chaque IP à 100 requêtes par `window` (ici, par 15 minutes) 
	standardHeaders : true ,  // Return rate limit info dans les en-têtes `RateLimit-*` 
	legacyHeaders : false ,  // Désactive les en-têtes `X-RateLimit-*` 
} )
// Apply the rate limiting middleware to all requests
//app.use(limiteur)

// Appliquer le middleware de limitation de débit à toutes les requêtes 
//app .utilisation ( limiteur )
//Importations des routes
const usersRoutes = require ('./routes/users.js');
const saucesRoutes = require('./routes/sauce.js');


/*  Accès aux variables d'environnement*/
const path = require ('path');
require('dotenv').config();
/*  Accès au chemin Mongodb*/

mongoose.connect(process.env.DB_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !',error));

/*Integration di modele CORS Ces headers permettent :

    d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.). */ 




const app = express();
app.use(express.json());
// Utilisation des middleware de helmet

// Headers pour éviter les erreurs de CORS
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/sauces" ,saucesRoutes);
app.use("/api/auth", usersRoutes);
app.use("/images", express.static(path.join(__dirname, "Images")));
module.exports = app;