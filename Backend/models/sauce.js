// Étape 4 : Construire la route Sauce de l’API
// Le Modèle Sauce
// SOURCE frontend/src/app/sauce-form/TS
// SOURCE (cours) : Passez au Full Stack avec Node.js, Express et MongoDB 
// Créez un schéma de données
// Créez un schéma Thing
// nous créons un schéma de données qui contient les champs souhaités pour chaque Thing, indique leur type ainsi que leur caractère (obligatoire ou non). Pour cela, on utilise la méthode Schema mise à disposition par Mongoose. Pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose ;
const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({ //La méthode  Schema  de Mongoose vous permet de créer un schéma de données pour votre base de données MongoDB.
  userId: { type: String, required: true },//L'identifiant MongoDB unique de l'utilisteur qui a crée la sauce
  name: { type: String, required: true },// nom de la sauce
  manufacturer: { type: String, required: true },// fabricant de la sauce
  description: { type: String, required: true },// description de la sauce 
  mainPepper: { type: String, required: true },// Principal ingredient de la sauce
  imageUrl: { type: String, required: true },// l url de l'image de la sauce téléchargé par le visiteur du site
  heat: { type: Number, required: true, min:1, max:10 },// nombre entre 1 et 10 appréciation sauce
  likes: { type: Number, required: false, default: 0 },// nombre de visteurs qui aiment like la sauce
  dislikes: { type: Number, required: false, default: 0 },// ceux qui n'aiment pas dislike
  usersLiked: { type: [String], required: false, default: [] },// chaîne de caractère STRING  user ID TABLEAU des identifiants des visiteurs qui like
  usersDisliked: { type: [String], required: false, default: [] },//et idem pour ceux qui n'aiment pas
});
// ensuite, nous exportons ce schéma en tant que modèle Mongoose appelé « Thing », le rendant par là même disponible pour notre application Express.
// La méthode  model  transforme ce modèle en un modèle utilisable.
module.exports = mongoose.model('Sauce', sauceSchema);
