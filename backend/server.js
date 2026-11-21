// ===== Importation des modules =====
const express = require('express');   // framework pour créer le serveur et les routes
const mongoose = require('mongoose'); // communication avec MongoDB
const cors = require('cors');         // autorise Angular (port 4200) à appeler l'API (port 3000)
require('dotenv').config();           // charge les variables du fichier .env

const app = express();

// ===== Middlewares =====
app.use(cors());
// Lit le JSON reçu dans req.body (limite augmentée pour les images en base64)
app.use(express.json({ limit: '10mb' }));

// ===== Routes =====
// Toutes les routes des annonces commencent par /api/annonces
app.use('/api/annonces', require('./routes/annonceRoutes'));

const PORT = process.env.PORT || 3000;

// ===== Connexion à MongoDB puis démarrage du serveur =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connexion MongoDB réussie');
    app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
  })
  .catch(err => console.log('Erreur MongoDB :', err));