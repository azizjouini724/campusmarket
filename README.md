# CampusMarket - La marketplace des étudiants

Application web **MEAN Stack** permettant aux étudiants de publier, consulter, modifier et supprimer des annonces pour vendre ou acheter des articles d'occasion (livres, vêtements, matériel informatique, accessoires, etc.).

Projet réalisé dans le cadre de l'Atelier 5 : Full Stack MEAN Stack - ISET Bizerte, Département des Technologies de l'Informatique.

## Fonctionnalités

- Affichage de toutes les annonces sous forme de cartes (image, titre, catégorie, prix en DT, état, vendeur)
- Ajout d'une annonce avec validation du formulaire
- Page de détails d'une annonce (description complète, coordonnées du vendeur)
- Modification d'une annonce (formulaire prérempli)
- Suppression avec message de confirmation
- Recherche par titre et filtres par catégorie et par état (Neuf / Occasion), mis à jour dynamiquement
- Upload d'une image depuis l'ordinateur (réduite puis stockée en base64)

## Technologies

| Technologie | Rôle |
|---|---|
| MongoDB | Stockage des annonces |
| Express.js | Création des routes de l'API REST |
| Angular | Interface utilisateur |
| Node.js | Exécution du serveur |
| Mongoose | Communication avec MongoDB |
| HttpClient | Communication Angular / API |
| Bootstrap | Mise en forme |

## Comprendre le MEAN Stack

MEAN est le nom d'un ensemble de 4 technologies JavaScript qui travaillent ensemble pour construire une application web complète :

- **M**ongoDB : la base de données, qui stocke les informations.
- **E**xpress.js : un framework qui crée le serveur et les routes de l'API.
- **A**ngular : le framework qui construit ce que l'utilisateur voit dans son navigateur.
- **N**ode.js : l'environnement qui exécute JavaScript côté serveur.

Avantage principal : un seul langage (JavaScript / TypeScript) pour toute l'application, du navigateur jusqu'à la base de données.

### Comment les 4 parties communiquent

Exemple avec le bouton « Publier une annonce » :

1. L'utilisateur remplit le formulaire dans **Angular** et clique sur « Publier ».
2. Angular envoie les données au serveur avec une requête HTTP POST (service `AnnonceService` et `HttpClient`).
3. **Express** (qui tourne sur **Node.js**) reçoit la requête sur la route `/api/annonces`.
4. **Mongoose** vérifie les données (titre, prix, etc.) puis les enregistre dans **MongoDB**.
5. Le serveur répond en JSON, et Angular met à jour l'affichage.

### Front-End et Back-End

- Le **Front-End** (Angular) est la partie visible : pages, formulaires, boutons.
- Le **Back-End** (Node.js, Express, MongoDB) est la partie cachée : elle traite les demandes, applique les règles et gère les données.
- Les deux communiquent par une **API REST**, qui est un ensemble de routes (GET, POST, PUT, DELETE) échangeant du JSON.

### Le CRUD

Toute l'application repose sur 4 opérations de base, appelées CRUD :

| Opération | Méthode HTTP | Exemple dans le projet |
|---|---|---|
| Create (créer) | POST | Publier une annonce |
| Read (lire) | GET | Afficher les annonces |
| Update (modifier) | PUT | Modifier le prix |
| Delete (supprimer) | DELETE | Supprimer une annonce |

## Architecture

```
Angular (HttpClient)  ->  API REST Express  ->  Mongoose  ->  MongoDB
   localhost:4200          localhost:3000                    campusmarket
```

## Structure du projet

```
campus/
├── backend/
│   ├── models/Annonce.js          # Schéma Mongoose
│   ├── routes/annonceRoutes.js    # Routes CRUD
│   ├── server.js                  # Serveur Express + connexion MongoDB
│   ├── .env.example               # Exemple de configuration
│   └── package.json
└── frontend-ng/
    └── src/app/
        ├── components/
        │   ├── navbar/            # Barre de navigation
        │   ├── home/              # Liste, recherche et filtres
        │   ├── annonce-details/   # Détails d'une annonce
        │   └── annonce-form/      # Ajout et modification
        ├── models/annonce.ts      # Interface Annonce
        ├── services/annonce.service.ts  # Communication avec l'API
        ├── app.routes.ts          # Routes Angular
        └── app.config.ts          # Configuration (HttpClient, router)
```

## API REST

| Méthode | Route | Description |
|---|---|---|
| GET | /api/annonces | Récupérer toutes les annonces |
| GET | /api/annonces/:id | Récupérer une annonce |
| POST | /api/annonces | Ajouter une annonce |
| PUT | /api/annonces/:id | Modifier une annonce |
| DELETE | /api/annonces/:id | Supprimer une annonce |

## Modèle de données

Base : `campusmarket` - Collection : `annonces`

```json
{
  "titre": "Livre Java",
  "description": "Livre Java pour débutants",
  "prix": 35,
  "categorie": "Livres",
  "etat": "Occasion",
  "vendeur": "Ahmed",
  "telephone": "22123456",
  "image": "https://example.com/livre.jpg"
}
```

Règles de validation : titre obligatoire (3 caractères minimum), prix supérieur à 0, état limité à `Neuf` ou `Occasion`, champs description, catégorie, vendeur et téléphone obligatoires. L'image est facultative.

## Prérequis

- Node.js
- Angular CLI (`npm install -g @angular/cli`)
- MongoDB Community Server démarré sur le port 27017

## Installation et lancement

### 1. Backend

```
cd backend
npm install
```

Créer un fichier `.env` à partir de `.env.example` :

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/campusmarket
```

Lancer le serveur :

```
npm run dev
```

Résultat attendu :

```
Connexion MongoDB réussie
Serveur démarré sur le port 3000
```

### 2. Frontend

Dans un autre terminal :

```
cd frontend-ng
npm install
ng serve
```

Ouvrir ensuite http://localhost:4200

## Scénarios de test

1. Afficher les annonces enregistrées
2. Ajouter une annonce valide
3. Essayer d'ajouter une annonce sans titre (message d'erreur affiché)
4. Modifier le prix d'une annonce
5. Supprimer une annonce (avec confirmation)
6. Rechercher une annonce par son titre
7. Filtrer les annonces par catégorie
8. Vérifier que les modifications sont enregistrées dans MongoDB

## Auteur

Mohamed Aziz Jouini - ISET Bizerte
