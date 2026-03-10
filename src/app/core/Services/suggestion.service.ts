import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suggestion } from '../../models/suggestion';
import { environment } from '../../../.env/environnement';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private suggestionUrl = environment.suggestionUrl;

  constructor(private http: HttpClient) {}

  // Récupérer toutes les suggestions
  getSuggestionsList(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl);
  }

  // Récupérer une suggestion par son id
  getSuggestionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.suggestionUrl}/${id}`);
  }

  // Ajouter une suggestion
  addSuggestion(suggestion: Omit<Suggestion, 'id'>): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.suggestionUrl, suggestion);
  }

  // Modifier une suggestion
  updateSuggestion(id: number, suggestion: Suggestion): Observable<any> {
    return this.http.put<any>(`${this.suggestionUrl}/${id}`, suggestion);
  }

  // Supprimer une suggestion
  deleteSuggestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.suggestionUrl}/${id}`);
  }

  // Incrémenter le nombre de likes (PATCH partiel)
  likeSuggestion(id: number, nbLikes: number): Observable<Suggestion> {
    return this.http.patch<Suggestion>(`${this.suggestionUrl}/${id}`, { nbLikes });
  }
}