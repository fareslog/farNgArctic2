import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../../core/Services/suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];
  isEditMode = false;
  suggestionId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.suggestionId = +params['id'];
        this.loadSuggestion(this.suggestionId);
      }
    });
  }

  initForm(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Z][a-zA-Z]*$')]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: this.getTodayDate(), disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  private getTodayDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  loadSuggestion(id: number): void {
    this.suggestionService.getSuggestionById(id).subscribe(suggestion => {
      this.suggestionForm.patchValue({
        title: suggestion.title,
        description: suggestion.description,
        category: suggestion.category
      });
    });
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.getRawValue();
      const suggestionData = {
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        date: new Date(),
        status: 'en_attente',
        nbLikes: 0
      };

      if (this.isEditMode && this.suggestionId) {
        // Mode modification : on récupère l'existant et on met à jour
        this.suggestionService.getSuggestionById(this.suggestionId).subscribe(existing => {
          const updated: Suggestion = {
            ...existing,
            title: suggestionData.title,
            description: suggestionData.description,
            category: suggestionData.category
          };
          this.suggestionService.updateSuggestion(this.suggestionId!, updated).subscribe(() => {
            this.router.navigate(['/suggestions/suggestions']);
          });
        });
      } else {
        // Mode ajout
        this.suggestionService.addSuggestion(suggestionData).subscribe(() => {
          this.router.navigate(['/suggestions/suggestions']);
        });
      }
    }
  }

  get title() { return this.suggestionForm.get('title'); }
  get description() { return this.suggestionForm.get('description'); }
  get category() { return this.suggestionForm.get('category'); }
}