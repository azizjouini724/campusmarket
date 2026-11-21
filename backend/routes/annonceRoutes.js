const express = require('express');
const router = express.Router();
const Annonce = require('../models/Annonce');

// ===== 1. GET /api/annonces : récupérer toutes les annonces =====
router.get('/', async (req, res) => {
  try {
    // find() lit tous les documents, triés du plus récent au plus ancien
    res.json(await Annonce.find().sort({ createdAt: -1 }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== 2. GET /api/annonces/:id : récupérer une annonce =====
router.get('/:id', async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id); // id lu dans l'URL
    if (!annonce) return res.status(404).json({ message: 'Annonce introuvable' });
    res.json(annonce);
  } catch (error) {
    res.status(400).json({ message: 'Identifiant invalide' });
  }
});

// ===== 3. POST /api/annonces : ajouter une annonce =====
router.post('/', async (req, res) => {
  try {
    // req.body contient les données envoyées par Angular
    // save() déclenche la validation du schéma puis enregistre
    const saved = await new Annonce(req.body).save();
    res.status(201).json(saved); // 201 = créé
  } catch (error) {
    res.status(400).json({ message: error.message }); // erreur de validation
  }
});

// ===== 4. PUT /api/annonces/:id : modifier une annonce =====
router.put('/:id', async (req, res) => {
  try {
    const updated = await Annonce.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // new : renvoie la version modifiée ; runValidators : vérifie les règles
    );
    if (!updated) return res.status(404).json({ message: 'Annonce introuvable' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ===== 5. DELETE /api/annonces/:id : supprimer une annonce =====
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Annonce.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Annonce introuvable' });
    res.json({ message: 'Annonce supprimée avec succès' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;