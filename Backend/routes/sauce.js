// Étape 4 : Construire la route Sauce de l’API
// La Route Sauce
// SOURCE (cours) : Passez au Full Stack avec Node.js, Express et MongoDB 
// Modifiez les routes pour prendre en compte les fichiers
// Modifiez la route POST
// Modifiez la route PUT
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../Controllers/sauce');

router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeOrDislike);

module.exports = router;
