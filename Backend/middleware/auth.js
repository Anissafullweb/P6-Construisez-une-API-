// Étape 3 : Démarrer le middleware
// Ajout d’authorize pour la validation des tokens.
// SOURCE (cours) : Passez au Full Stack avec Node.js, Express et MongoDB
// Configurez le middleware d'authentification
// Implémentez le middleware d'authentification
//Pour avoir des tokens uniques
// IMPORTS
const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
    // Récupérationtoken de la requête entrante
       const token = req.headers.authorization.split(' ')[1];
       //Vérifiaction token
       const decodedToken = jwt.verify(token,process.env.RANDOM_SECRET_TOKEN);
       // Récupération Id Token
       const userId = decodedToken.userId;
       // Comparaison id user de la requete avec le Token
       req.auth = {
           userId: userId
       };
    next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
