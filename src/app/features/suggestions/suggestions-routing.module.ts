import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionsComponent } from './suggestions.component';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';

const routes: Routes = [
   {
    path: '',
    component: SuggestionsComponent,  // composant conteneur avec <router-outlet>
    children: [
      {redirectTo: 'suggestions', pathMatch: 'full', path: ''}, // redirection vers la liste
      { path: 'suggestions', component: ListSuggestionComponent }, // liste des suggestions
      { path: 'suggestions/:id', component: SuggestionDetailsComponent }, // détail d'une suggestion
      { path: 'suggestionform', component: SuggestionFormComponent } // détail d'une suggestion
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }
