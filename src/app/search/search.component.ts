import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RecipeService } from '../recipe.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(
    public recipeService: RecipeService
  ) {
    // this.recipeService.searchKeywaord.subscribe(keyword => {
    //   console.log(keyword);
    // })
  }

}
