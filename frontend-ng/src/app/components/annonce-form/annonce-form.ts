import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnnonceService } from '../../services/annonce.service';
import { Annonce, CATEGORIES } from '../../models/annonce';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// Un seul formulaire pour l'ajout ET la modification
@Component({
  selector: 'app-annonce-form',
  imports: [FormsModule, RouterLink],
  template: `
    <a routerLink="/" class="text-decoration-none">← Retour aux annonces</a>
    <h2 class="my-3">{{ id ? "Modifier l'annonce" : 'Publier une annonce' }}</h2>

    <!-- novalidate : on utilise notre propre affichage d'erreurs -->
    <form #f="ngForm" (ngSubmit)="enregistrer(f.valid ?? false)" novalidate class="row g-3">

      <!-- Titre : obligatoire, 3 caractères minimum -->
      <div class="col-md-6">
        <label class="form-label">Titre *</label>
        <input class="form-control" name="titre" [(ngModel)]="annonce.titre"
               required minlength="3" #titre="ngModel"
               [class.is-invalid]="(titre.invalid) && (titre.touched || submitted)">
        <div class="invalid-feedback">Le titre est obligatoire (3 caractères minimum).</div>
      </div>

      <!-- Prix : supérieur à 0 -->
      <div class="col-md-6">
        <label class="form-label">Prix (DT) *</label>
        <input type="number" class="form-control" name="prix" [(ngModel)]="annonce.prix"
               required min="0.01" #prix="ngModel"
               [class.is-invalid]="prix.invalid && (prix.touched || submitted)">
        <div class="invalid-feedback">Le prix doit être supérieur à 0.</div>
      </div>

      <!-- Description : obligatoire -->
      <div class="col-12">
        <label class="form-label">Description *</label>
        <textarea rows="3" class="form-control" name="description" [(ngModel)]="annonce.description"
                  required #desc="ngModel"
                  [class.is-invalid]="desc.invalid && (desc.touched || submitted)"></textarea>
        <div class="invalid-feedback">La description est obligatoire.</div>
      </div>

      <!-- Catégorie : liste déroulante obligatoire -->
      <div class="col-md-6">
        <label class="form-label">Catégorie *</label>
        <select class="form-select" name="categorie" [(ngModel)]="annonce.categorie"
                required #cat="ngModel"
                [class.is-invalid]="cat.invalid && (cat.touched || submitted)">
          <option value="">-- Choisir --</option>
          @for (c of categories; track c) { <option [value]="c">{{ c }}</option> }
        </select>
        <div class="invalid-feedback">Choisissez une catégorie.</div>
      </div>

      <!-- État : Neuf ou Occasion -->
      <div class="col-md-6">
        <label class="form-label">État *</label>
        <select class="form-select" name="etat" [(ngModel)]="annonce.etat" required>
          <option value="Neuf">Neuf</option>
          <option value="Occasion">Occasion</option>
        </select>
      </div>

      <!-- Vendeur : obligatoire -->
      <div class="col-md-6">
        <label class="form-label">Vendeur *</label>
        <input class="form-control" name="vendeur" [(ngModel)]="annonce.vendeur"
               required #vend="ngModel"
               [class.is-invalid]="vend.invalid && (vend.touched || submitted)">
        <div class="invalid-feedback">Le nom du vendeur est obligatoire.</div>
      </div>

      <!-- Téléphone : obligatoire -->
      <div class="col-md-6">
        <label class="form-label">Téléphone *</label>
        <input class="form-control" name="telephone" [(ngModel)]="annonce.telephone"
               required #tel="ngModel"
               [class.is-invalid]="tel.invalid && (tel.touched || submitted)">
        <div class="invalid-feedback">Le téléphone est obligatoire.</div>
      </div>

      <!-- Image : choisie depuis le PC -->
      <div class="col-12">
        <label class="form-label">Image de l'annonce</label>
        <input type="file" class="form-control" accept="image/*"
               (change)="onFileSelected($event)">
        <!-- Aperçu de l'image (ou de l'ancienne image en modification) -->
        @if (annonce.image) {
          <img [src]="annonce.image" class="mt-2 rounded border" style="max-height:150px">
        }
      </div>

      <div class="col-12">
        <!-- Bouton désactivé pendant l'envoi pour éviter les doubles clics -->
        <button class="btn btn-primary" type="submit" [disabled]="submitting">
          {{ id ? 'Enregistrer les modifications' : 'Publier' }}
        </button>
      </div>
    </form>
  `
})
export class AnnonceForm implements OnInit {
  id: string | null = null;   // id de l'annonce (null en mode ajout)
  submitted = false;          // vrai après le 1er clic sur le bouton (affiche les erreurs)
  submitting = false;         // vrai pendant l'envoi
  readonly categories = CATEGORIES;

  // Objet lié au formulaire (valeurs vides par défaut)
  annonce: Annonce = {
    titre: '', description: '', prix: 0, categorie: '',
    etat: 'Occasion', vendeur: '', telephone: '', image: ''
  };

  constructor(
  private service: AnnonceService,
  private route: ActivatedRoute,
  private router: Router,
  private cdr: ChangeDetectorRef   // permet de forcer le rafraîchissement
) {}

  ngOnInit(): void {
    // Récupérer l'id dans l'URL (/modifier/:id)
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      // Mode modification : charger l'annonce pour préremplir le formulaire
      this.service.getAnnonceById(this.id).subscribe({
        next: data => {
          this.annonce = { ...data };  // préremplit le formulaire
          this.cdr.detectChanges();    // force Angular à rafraîchir l'affichage
        },
        error: () => {
          alert('Annonce introuvable.');
          this.router.navigate(['/']);
        }
      });
    }
  }

  // Lit l'image choisie, la réduit, puis la convertit en texte base64
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    // Vérifier que c'est bien une image
    if (!file.type.startsWith('image/')) {
      alert('Veuillez choisir un fichier image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Réduire l'image à 800 px de large maximum
        const maxWidth = 800;
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convertir en JPEG compressé (base64) et le mettre dans l'annonce
        this.annonce.image = canvas.toDataURL('image/jpeg', 0.8);
        this.cdr.detectChanges();   // afficher l'aperçu de l'image
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Appelée à la soumission du formulaire
  enregistrer(valid: boolean): void {
    this.submitted = true;                 // afficher les erreurs éventuelles
    if (!valid || this.submitting) return; // formulaire invalide : on arrête
    this.submitting = true;

    // Modification (PUT) si on a un id, sinon ajout (POST)
    const op = this.id
      ? this.service.updateAnnonce(this.id, this.annonce)
      : this.service.addAnnonce(this.annonce);

    op.subscribe({
      next: () => {
        alert(this.id ? 'Annonce modifiée avec succès !' : 'Annonce publiée avec succès !');
        this.router.navigate(['/']); // retour à l'accueil
      },
      error: err => {
        this.submitting = false;
        // Affiche le message d'erreur envoyé par le serveur
        alert(err?.error?.message || "Erreur lors de l'enregistrement.");
      }
    });
  }
}