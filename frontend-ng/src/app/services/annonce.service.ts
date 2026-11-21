import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annonce } from '../models/annonce';

// Le service fait le lien entre Angular et l'API Express
@Injectable({ providedIn: 'root' }) // un seul service partagé dans toute l'application
export class AnnonceService {
  // Adresse de l'API back-end
  private readonly apiUrl = 'http://localhost:3000/api/annonces';

  // HttpClient est injecté par Angular
  constructor(private http: HttpClient) {}

  // GET : liste de toutes les annonces
  getAnnonces(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(this.apiUrl);
  }
  // GET : une annonce par son id
  getAnnonceById(id: string): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.apiUrl}/${id}`);
  }
  // POST : ajouter une annonce
  addAnnonce(annonce: Annonce): Observable<Annonce> {
    return this.http.post<Annonce>(this.apiUrl, annonce);
  }
  // PUT : modifier une annonce
  updateAnnonce(id: string, annonce: Annonce): Observable<Annonce> {
    return this.http.put<Annonce>(`${this.apiUrl}/${id}`, annonce);
  }
  // DELETE : supprimer une annonce
  deleteAnnonce(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}