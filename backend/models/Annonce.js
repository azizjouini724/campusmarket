const mongoose = require('mongoose');

// Schéma : structure et règles de validation d'une annonce
const annonceSchema = new mongoose.Schema({
  titre: { type: String, required: true, minlength: 3 },   // obligatoire, 3 caractères min
  description: { type: String, required: true },           // obligatoire
  prix: { type: Number, required: true, min: 0.01 },       // supérieur à 0
  categorie: { type: String, required: true },             // obligatoire
  etat: { type: String, enum: ['Neuf', 'Occasion'], required: true }, // valeurs limitées
  vendeur: { type: String, required: true },
  telephone: { type: String, required: true },
  // Image facultative : URL ou texte base64 (upload depuis le PC)
  image: { type: String, default: 'https://placehold.co/400x250?text=CampusMarket' }
}, { timestamps: true }); // ajoute automatiquement createdAt et updatedAt

// Création du modèle "Annonce" (collection "annonces" dans MongoDB)
module.exports = mongoose.model('Annonce', annonceSchema);