import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';

// Composant racine : navbar fixe + zone où s'affichent les pages
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  template: `
    <app-navbar></app-navbar>
    <div class="container py-4">
      <!-- La page correspondant à l'URL s'affiche ici -->
      <router-outlet></router-outlet>
    </div>
  `
})
export class App {}