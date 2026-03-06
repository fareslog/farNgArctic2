import { Component } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent {
  suggestions: Suggestion[];
  searchTerm: string = '';
  favorites: Suggestion[] = [];

  constructor(private suggestionService: SuggestionService) { // ← injection
    this.suggestions = this.suggestionService.getSuggestionsList(); // ← utilisation du service
  }

  get filteredSuggestions(): Suggestion[] {
    if (!this.searchTerm.trim()) {
      return this.suggestions;
    }
    const term = this.searchTerm.toLowerCase().trim();
    return this.suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(term) ||
      suggestion.category.toLowerCase().includes(term)
    );
  }

  like(suggestion: Suggestion): void {
    suggestion.nbLikes++;
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
}