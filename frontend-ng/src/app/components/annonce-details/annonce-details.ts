import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnnonceService } from '../../services/annonce.service';
import { Annonce } from '../../models/annonce';

// Page de détails d'une annonce
@Component({
  selector: 'app-annonce-details',
  imports: [RouterLink, DecimalPipe],
  template: `
    <a routerLink="/" class="text-decoration-none">← Retour aux annonces</a>

    <!-- S'affiche seulement quand l'annonce est chargée -->
    @if (annonce(); as a) {
      <div class="card mt-3 shadow-sm">
        <div class="row g-0">
          <div class="col-md-5">
            <img [src]="a.image || 'https://placehold.co/400x250.png?text=Pas+d+image'"
                 (error)="$any($event.target).src='https://placehold.co/400x250.png?text=Image+indisponible'"
                 class="img-fluid rounded-start w-100" [alt]="a.titre">
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <h3>{{ a.titre }}</h3>
              <span class="badge bg-secondary me-1">{{ a.categorie }}</span>
              <span class="badge" [class.bg-success]="a.etat === 'Neuf'"
                    [class.bg-warning]="a.etat !== 'Neuf'">{{ a.etat }}</span>
              <p class="fs-3 fw-bold text-primary mt-3">{{ a.prix | number:'1.0-2' }} DT</p>
              <p>{{ a.description }}</p>
              <hr>
              <!-- Coordonnées du vendeur -->
              <p class="mb-1"><strong>Vendeur :</strong> {{ a.vendeur }}</p>
              <p><strong>Téléphone :</strong> {{ a.telephone }}</p>
              <a [routerLink]="['/modifier', a._id]" class="btn btn-outline-primary me-2">Modifier</a>
              <button class="btn btn-outline-danger" (click)="supprimer(a._id!)">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <p class="mt-3 text-muted">Chargement...</p>
    }
  `
})
export class AnnonceDetails implements OnInit {
  annonce = signal<Annonce | null>(null); // null tant que l'annonce n'est pas chargée

  constructor(
    private service: AnnonceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'id dans l'URL (/annonce/:id) puis charger l'annonce
    const id = this.route.snapshot.paramMap.get('id')!;
    this.service.getAnnonceById(id).subscribe({
      next: data => this.annonce.set(data),
      error: () => {
        alert('Annonce introuvable.');
        this.router.navigate(['/']);
      }
    });
  }

  // Suppression avec confirmation, puis retour à l'accueil
  supprimer(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer cette annonce ?')) {
      this.service.deleteAnnonce(id).subscribe(() => this.router.navigate(['/']));
    }
  }
}