import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion: Suggestion | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  // ngOnInit(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.suggestionService.getSuggestionById(id).subscribe({
  //     next: data => this.suggestion = data,
  //     error: err => console.error('Erreur chargement détail', err)
  //   });
  // }

  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.suggestionService.getSuggestionById(id).subscribe({
    next: data => {
      console.log('Données reçues:', data);
      // Extract the nested suggestion object
      this.suggestion = data.suggestion; // assuming the response has { success: true, suggestion: {...} }
    },
    error: err => console.error('Erreur chargement détail', err)
  });
}

  goBack(): void {
    this.router.navigate(['/suggestions/suggestions']);
  }

  // ✅ La méthode accepte maintenant un paramètre id
  updateSuggestion(id: number): void {
    this.router.navigate(['/suggestions/suggestionform', id]);
  }
}