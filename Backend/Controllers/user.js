// Etape 2 : Le parcours utilisateur (source cours full stack 3°partie 3° Chapitre)
// Étape 2 : Construire le parcours utilisateur
// Contrôleur d'utilisateur
// SOURCE (cours) : Passez au Full Stack avec Node.js, Express et MongoDB
require('dotenv').config();
const bcrypt = require('bcrypt');// appel à la fonction de hachage de bcrypt dans le mot de passe et lui demander de « saler » le mot de passe 10 fois. Plus la valeur est élevée, plus l'exécution de la fonction sera longue, et plus le hachage sera sécurisé.
const User = require('../models/user');
const jwt = require('jsonwebtoken');// Se connecter et disposer d'un token valide.
// Création des tokens d'authentification
// Les JSON web tokens sont des tokens chiffrés qui peuvent être utilisés pour l'autorisation.

// INSCRIPTION
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => { // La méthode  hash() de bcrypt crée un hash crypté des mots de passe de vos utilisateurs pour les enregistrer de manière sécurisée dans la base de données.
      const user = new User({ // créer un nouveau user
        email: req.body.email, // l'adresse mail
        password: hash // le mot de passe haché
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// CONNECTION
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // on vérifie que l'adresse mail figure bien dan la base de données
      .then(user => {
          if (!user) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          bcrypt.compare(req.body.password, user.password) // on compare les mots de passes
              .then(valid => {
                  if (!valid) {
                      return res.status(401).json({ error: 'Mot de passe incorrect !' });
                  }
                  
                  res.status(200).json({
                      userId: user._id,
                      token: jwt.sign( // La méthode sign() du package jsonwebtoken utilise une clé secrète pour chiffrer un token qui peut contenir un payload personnalisé et avoir une validité limitée.
                          { userId: user._id },
                          'RANDOM_TOKEN_SECRET',// Utilisation une chaîne secrète de développement temporaire RANDOM_SECRET_KEY pour crypter notre token 
                          { expiresIn: '24h' }
                      )
                  });
              })
              .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};
