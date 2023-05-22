// Étape 4 : Construire la route Sauce de l’API
// Le Contrôleur Sauce
// SOURCE (cours) : Passez au Full Stack avec Node.js, Express et MongoDB 
// Optimisez la structure du back-end
// Configurez les contrôleurs
// Un fichier de contrôleur exporte des méthodes qui sont ensuite attribuées aux routes pour améliorer la maintenabilité de votre application.
const Sauce = require('../models/sauce');
const fs = require('fs');
// L'utilisateur est en mesure d'effectuer les opérations suivantes :
// Ajouter une nouvelle sauce
exports.createSauce = (req, res, next) => {
  console.log('Sauce créée :', req.body.sauce);
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// Voir une sauce spécifique
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
  .then(() => res.status(200).json({message : 'Sauce modifiée!'}))
  .catch(error => res.status(400).json({ error }));

};
// Développez la fonction delete du back-end
// Modifiez la route DELETE
// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
      .then(sauce => {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Sauce.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Sauce supprimée !'})})
                      .catch(error => res.status(400).json({ error }));
              });
      })
      .catch( error => {
          res.status(400).json({ error });
      });
};
// Voir toutes les sauces
exports.getAllSauces= (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likeSauce = (req, res, next) => {
  if (req.body.like === 1) {  // J'aime
      Sauce.updateOne( {_id:req.params.id}, { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } })
        .then(() => res.status(201).json({ message: 'Like ajouté !'}))
        .catch(error => res.status(400).json({ error }));

  } else if (req.body.like === -1) {  // Je n'aime pas
      Sauce.updateOne( {_id:req.params.id}, { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 } })
        .then(() => res.status(201).json({ message: 'Dislike ajouté !'}))
        .catch(error => res.status(400).json({ error }));
        
  } else {  // Je n'ai plus d'avis
      Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne( {_id:req.params.id}, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
              .then(() => res.status(201).json({ message: 'Like supprimé !'}))
              .catch(error => res.status(400).json({ error }))
          } else if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne( {_id:req.params.id}, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
              .then(() => res.status(201).json({ message: 'Dislike supprimé !'}))
              .catch(error => res.status(400).json({ error }))
          }
        })
        .catch(error => res.status(400).json({ error }));
  }
};
