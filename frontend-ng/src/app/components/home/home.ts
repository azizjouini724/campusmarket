import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnnonceService } from '../../services/annonce.service';
import { Annonce, CATEGORIES } from '../../models/annonce';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink, DecimalPipe], // FormsModule : nécessaire pour ngModel
  template: `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Les annonces</h2>
      <a routerLink="/ajouter" class="btn btn-primary">+ Publier une annonce</a>
    </div>

    <!-- Recherche par titre + filtres catégorie et état -->
    <div class="row g-2 mb-4">
      <div class="col-md-5">
        <input class="form-control" placeholder="Rechercher par titre..."
               [ngModel]="recherche()" (ngModelChange)="recherche.set($event)">
      </div>
      <div class="col-md-4">
        <select class="form-select" [ngModel]="categorie()" (ngModelChange)="categorie.set($event)">
          <option value="">Toutes les catégories</option>
          @for (c of categories; track c) { <option [value]="c">{{ c }}</option> }
        </select>
      </div>
      <div class="col-md-3">
        <select class="form-select" [ngModel]="etat()" (ngModelChange)="etat.set($event)">
          <option value="">Neuf / Occasion</option>
          <option value="Neuf">Neuf</option>
          <option value="Occasion">Occasion</option>
        </select>
      </div>
    </div>

    <p class="text-muted">{{ filtrees().length }} annonce(s) trouvée(s)</p>

    <!-- Cartes : une par annonce filtrée -->
    <div class="row g-3">
      @for (a of filtrees(); track a._id) {
        <div class="col-sm-6 col-lg-3">
          <div class="card h-100 shadow-sm">
            <!-- Image ; si elle est cassée, une image de secours s'affiche -->
            <img [src]="a.image || 'https://placehold.co/400x250.png?text=Pas+d+image'"
                 (error)="$any($event.target).src='https://placehold.co/400x250.png?text=Image+indisponible'"
                 class="card-img-top" style="height:180px;object-fit:cover" [alt]="a.titre">
            <div class="card-body">
              <h5 class="card-title">{{ a.titre }}</h5>
              <span class="badge bg-secondary me-1">{{ a.categorie }}</span>
              <!-- Vert si Neuf, orange sinon -->
              <span class="badge" [class.bg-success]="a.etat === 'Neuf'"
                    [class.bg-warning]="a.etat !== 'Neuf'">{{ a.etat }}</span>
              <p class="fw-bold text-primary fs-5 mt-2 mb-1">{{ a.prix | number:'1.0-2' }} DT</p>
              <p class="small text-muted mb-0">Vendeur : {{ a.vendeur }}</p>
            </div>
            <div class="card-footer bg-white d-flex gap-1">
              <a [routerLink]="['/annonce', a._id]" class="btn btn-sm btn-primary flex-fill">Voir détails</a>
              <a [routerLink]="['/modifier', a._id]" class="btn btn-sm btn-outline-secondary">✎</a>
              <button class="btn btn-sm btn-outline-danger" (click)="supprimer(a._id!)">🗑</button>
            </div>
          </div>
        </div>
      } @empty {
        <p class="text-center text-muted">Aucune annonce trouvée.</p>
      }
    </div>
  `
})
export class Home implements OnInit {
  readonly categories = CATEGORIES;

  // Les signals se mettent à jour dynamiquement dans l'affichage
  annonces = signal<Annonce[]>([]);  // toutes les annonces reçues de l'API
  recherche = signal('');            // texte de la recherche
  categorie = signal('');            // catégorie choisie
  etat = signal('');                 // état choisi

  // Liste filtrée : recalculée à chaque changement de recherche ou de filtre
  filtrees = () =>
    this.annonces().filter(a =>
      a.titre.toLowerCase().includes(this.recherche().toLowerCase()) &&
      (this.categorie() === '' || a.categorie === this.categorie()) &&
      (this.etat() === '' || a.etat === this.etat())
    );

  constructor(private service: AnnonceService) {}

  // Au chargement de la page : récupérer les annonces
  ngOnInit(): void {
    this.charger();
  }

  // Appel GET vers l'API
  charger(): void {
    this.service.getAnnonces().subscribe({
      next: data => this.annonces.set(data),
      error: err => console.error('Erreur de chargement', err)
    });
  }

  // Suppression avec message de confirmation
  supprimer(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer cette annonce ?')) {
      this.service.deleteAnnonce(id).subscribe({
        next: () => this.charger(), // recharger la liste après suppression
        error: () => alert('Erreur lors de la suppression')
      });
    }
  }
}