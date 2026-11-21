# 🎓 CampusMarket — La marketplace des étudiants

Application web **MEAN Stack** permettant aux étudiants de publier, consulter, modifier et supprimer des annonces pour vendre ou acheter des articles d'occasion (livres, vêtements, matériel informatique, accessoires...).

Projet réalisé dans le cadre de l'**Atelier 5 : Full Stack MEAN Stack** — ISET Bizerte, Département des Technologies de l'Informatique.

## ✨ Fonctionnalités

- Affichage de toutes les annonces sous forme de cartes (image, titre, catégorie, prix en DT, état, vendeur)
- Ajout d'une annonce avec validation du formulaire
- Page de détails d'une annonce (description complète, coordonnées du vendeur)
- Modification d'une annonce (formulaire prérempli)
- Suppression avec message de confirmation
- Recherche par titre et filtres par catégorie et par état (Neuf / Occasion), mis à jour dynamiquement
- Upload d'une image depuis l'ordinateur (réduite puis stockée en base64)

## 🛠️ Technologies

| Technologie | Rôle |
|---|---|
| MongoDB | Stockage des annonces |
| Express.js | Création des routes de l'API REST |
| Angular | Interface utilisateur |
| Node.js | Exécution du serveur |
| Mongoose | Communication avec MongoDB |
| HttpClient | Communication Angular ↔ API |
| Bootstrap | Mise en forme |

## 🏗️ Architecture

```
Angular (HttpClient)  →  API REST Express  →  Mongoose  →  MongoDB
   localhost:4200          localhost:3000                  campusmarket
```

```
campus/
├── backend/
│   ├── models/Annonce.js          # Schéma Mongoose
│   ├── routes/annonceRoutes.js    # Routes CRUD
│   ├── server.js                  # Serveur Express + connexion MongoDB
