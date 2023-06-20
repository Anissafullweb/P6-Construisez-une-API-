// Étape 2 : Construire le parcours utilisateur
// Parcours utilisateur
const express = require('express');
const router = express.Router();
const userCtrl = require('../Controllers/user');
const rateLimit = require ('express-rate-limit');

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;

