import { Injectable } from '@angular/core';
import { RecipeDetail } from './recipe';
import { Recipes } from './mock-recipes';
import { BehaviorSubject, Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public searchKeyword: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  // getRecipes() : RecipeDetail []{
  //   return Recipes;
  // }

  public getRecipes(): Observable<RecipeDetail[]> {
    const recipes = of(Recipes); // 回傳一個 Observable<RecipeDetail[]> 發出單個值 (recipe 陣列 = recipes)
    return recipes;
  }


  // 根據 id 提取單個 recipe 資料
  public getRecipe(id: number): Observable<RecipeDetail> {
    const recipe = Recipes.find(r => r.id === id)!; // ! >> 非空斷言運算符（Non-null Assertion Operator），確定這個值不會是 null/undefined
    return of(recipe);
  }
}


// Recipes >> 全部菜單 (HEROS)
// recipes 屬性 >> expose Recipes 全部的陣列 (heros)
// recipe 單個物件
// RecipeDetail 單個細項 (Hero)

// : 宣告型別,  = 賦予值
