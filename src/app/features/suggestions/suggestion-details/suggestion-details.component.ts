import { Component, OnInit } from '@angular/core'; // ← ajout OnInit
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent implements OnInit { // ← implémente OnInit
  suggestion: Suggestion | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService // ← injection
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.suggestion = this.suggestionService.getSuggestionById(id); // ← appel au service
  }

  goBack(): void {
    this.router.navigate(['/suggestions']); // redirection vers la liste
  }
}