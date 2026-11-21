import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { AnnonceForm } from './components/annonce-form/annonce-form';
import { AnnonceDetails } from './components/annonce-details/annonce-details';

// Chaque URL affiche un composant
export const routes: Routes = [
  { path: '', component: Home },                       // accueil : liste des annonces
  { path: 'ajouter', component: AnnonceForm },         // formulaire d'ajout
  { path: 'modifier/:id', component: AnnonceForm },    // formulaire de modification (:id = paramètre)
  { path: 'annonce/:id', component: AnnonceDetails },  // détails d'une annonce
  { path: '**', redirectTo: '' }                       // URL inconnue : retour à l'accueil
];