import { Injectable } from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import {Ingredient} from './ingredient.model';
import {RecipeService} from '../recipes/recipe.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';



@Injectable()
export class RepositoryService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private slService: ShoppingListService,
              private authService: AuthService) { }

  storeRecipes() {
    // return this.httpClient.put('https://ng-recipe-book-2-d9186.firebaseio.com/recipes.json', this.recipeService.getRecipes(),
    //   {observe: 'body',
    //     params: new HttpParams().set('auth', token)});

    const req = new HttpRequest('PUT', 'https://ng-recipe-book-2-d9186.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());
    return this.httpClient.request(req);
  }


  getRecipes() {
    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-2-d9186.firebaseio.com/recipes.json?')
      .pipe(
        map(
          (recipes) => {
            for (const recipe of recipes) {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
            return recipes;
          }
        )
      )
      .subscribe(
          (recipes: Recipe[]) => {

            this.recipeService.getRecipesFromDB(recipes);
          }
      );
  }

  storeShoppingList() {
    return this.httpClient.put('https://ng-recipe-book-2-d9186.firebaseio.com/shoppingList.json?',
      this.slService.getIngredients(), {observe: 'body'});
  }

  getShoppingList() {
    return this.httpClient.get<Ingredient[]>('https://ng-recipe-book-2-d9186.firebaseio.com/shoppingList.json?')
      .subscribe(
          (ingredients) => {
            this.slService.getShoppingListToDB(ingredients);
          }
      );
  }

}
