import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  suggestions: Suggestion[] = [];
  searchTerm: string = '';
  favorites: Suggestion[] = [];

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionService.getSuggestionsList().subscribe(data => {
      this.suggestions = data;
    });
  }

  get filteredSuggestions(): Suggestion[] {
    if (!this.searchTerm.trim()) {
      return this.suggestions;
    }
    const term = this.searchTerm.toLowerCase().trim();
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(term) ||
      s.category.toLowerCase().includes(term)
    );
  }

  like(suggestion: Suggestion): void {
    suggestion.nbLikes++;
    this.suggestionService.likeSuggestion(suggestion.id, suggestion.nbLikes).subscribe({
      error: err => {
        console.error('Erreur like', err);
        suggestion.nbLikes--; // rollback
      }
    });
  }

  addToFavorites(suggestion: Suggestion): void {
    const index = this.favorites.findIndex(fav => fav.id === suggestion.id);
    if (index === -1) {
      this.favorites.push(suggestion);
    } else {
      this.favorites.splice(index, 1);
    }
  }

  isFavorite(suggestion: Suggestion): boolean {
    return this.favorites.some(fav => fav.id === suggestion.id);
  }

  deleteSuggestion(id: number): void {
    if (confirm('Supprimer cette suggestion ?')) {
      this.suggestionService.deleteSuggestion(id).subscribe(() => {
        this.suggestions = this.suggestions.filter(s => s.id !== id);
        this.favorites = this.favorites.filter(fav => fav.id !== id);
      });
    }
  }
}