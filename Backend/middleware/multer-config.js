// Étape 3 : Démarrer le middleware
// Ajout de multer pour les images.
// SOURCE (cours) : Passez au Full Stack avec Node.js, Express et MongoDB
// Acceptez les fichiers entrants avec multer
// Configurez le middleware de gestion des fichiers
// Récupération des images stockées sur le serveur
// IMPORT
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
// Export Multer
module.exports = multer({storage: storage}).single('image');
