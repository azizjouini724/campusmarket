import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// Barre de navigation affichée sur toutes les pages
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/">🎓 CampusMarket</a>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <!-- routerLinkActive ajoute la classe "active" sur la page courante -->
            <a class="nav-link" routerLink="/" routerLinkActive="active"
               [routerLinkActiveOptions]="{ exact: true }">Annonces</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/ajouter" routerLinkActive="active">Publier</a>
          </li>
        </ul>
      </div>
    </nav>
  `
})
export class Navbar {}