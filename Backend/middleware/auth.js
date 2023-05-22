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
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
    next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
