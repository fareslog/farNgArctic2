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

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.suggestionService.getSuggestionById(id).subscribe(data => {
      this.suggestion = data;
    });
  }

  goBack(): void {
    this.router.navigate(['/suggestions/suggestions']);
  }

  updateSuggestion(): void {
    this.router.navigate(['/suggestions/suggestionform', this.suggestion?.id]);
  }
}