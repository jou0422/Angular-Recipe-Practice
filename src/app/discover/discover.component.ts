import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { filterIngredient, filterTime, filterType, filterCuisine, Recipes } from '../mock-recipes';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeDetail } from '../recipe';
import { RecipeService } from '../recipe.service';
import { elementAt, filter } from 'rxjs';

export interface FilterItem {
  Item: string;
  SelectedItem: string;
}


@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, NgFor, NgIf],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss'
})
export class DiscoverComponent {
  ingredients = filterIngredient;
  cooktime = filterTime;
  types = filterType;
  cuisines = filterCuisine;

  filters: FilterItem[] = [];

  filterDisplay: boolean = false;

  recipes: RecipeDetail[] = Recipes;

  noRecipesFound: boolean = false;


  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.filters.length > 0; {
      this.filterDisplay = true;
    }
  }

  public ngOnInit(): void {
    this.getRecipes();
    this.ingredients.sort((a, b) => a.localeCompare(b));
    this.types.sort((a, b) => a.localeCompare(b));
    this.cuisines.sort((a, b) => a.localeCompare(b));

    // 從 URL 參數中獲取 tag
    this.route.queryParams.subscribe(parama => {
      if (parama['hashtag']) {
        // 自動選擇該 hashtag
        this.selectHashtag(parama['hashtag']);
      }
    })
  }

  public selectHashtag(filter: string) {
    this.onClickSelectTag('types', filter)
  }

  public onClickSelectTag(type: string, selectedItem: string): void {
    // let result: string = '';
    // if (type === 'types' || type === 'cuisines') {
    //   result = `#${selectedItem}`;
    // }
    // else {
    //   result = selectedItem;
    // }
    this.filters.push({ Item: type, SelectedItem: selectedItem });
    this.recipes = this.findRecipe();
  }

  /**
   * 用 filter 在全部 recipes 找出包含 filter hashtag & 時間 & ingredient 都符合的 recipe
   * 用 Number() 把 string 轉換為 number
   * @returns finalRecipe
   */
  private findRecipe(): RecipeDetail[] {
    let finalRecipe = this.recipes.filter(res =>
      this.filters.every(ele => {
        if (ele.Item === 'types' || ele.Item === 'cuisines') return res.hashtag.includes(ele.SelectedItem);
        if (ele.Item === 'cooktime') return res.timeMin === Number(ele.SelectedItem);
        if (ele.Item === 'ingredients') return res.ingredients.some(item => item.item.includes(ele.SelectedItem))
        return false; // 如果上述條件都不符合，返回 false
      })
    )
    if (finalRecipe.length === 0) {
      this.noRecipesFound = true;
    } else {
      this.noRecipesFound = false;
    }
    return finalRecipe;
  }

  /**
  * 用 splice() 刪除指定單一 filter，先重置成 default 食譜，再進行一次篩選
  * @param index >> 從該項目開始，刪除 1 項，即刪除自己
  */
  public removeSingleFilter(index: number) {
    this.filters.splice(index, 1);
    this.getRecipes();
    this.recipes = this.findRecipe();
  }


  /**
   * splice(0) >> 從第 1 項開始刪除所有元素
   */
  public clearAllFilters() {
    this.filters.splice(0);
    this.getRecipes();
  }


  public checkDuplicate(selectedItem: string): boolean {
    const result: FilterItem[] = this.filters.filter(res => res.SelectedItem === selectedItem);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  }



  private getRecipes(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => this.recipes = recipes);
    // .subscribe(recipes => this.recipes = recipes.slice(0, 5)) // 回傳第1~5個
  }

}
