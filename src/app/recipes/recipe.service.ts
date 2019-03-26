import {Recipe} from './recipe.model';
import {Injectable, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
import {RepositoryService} from '../shared/repository.service';

@Injectable()
export class RecipeService implements OnInit{
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel',
      'Asuper-tasty Schnitzel - just awesome',
      'https://upload.wikimedia.org/wikipedia/commons/8/89/Wiener_Schnitzel_at_Gasthaus_Joainig_%28lightened%29.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://www.publicdomainpictures.net/pictures/240000/nahled/burger-on-a-wooden-backgound.jpg',
      [
        new Ingredient('Bread', 2),
        new Ingredient('Meat', 1),
        new Ingredient('Tomatoes', 2),
        new Ingredient('Lettuce', 1),
        new Ingredient('Onion', 3)
      ])
  ];

  constructor(private Slservice: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.Slservice.addIngredints(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipeChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.getRecipes());

  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.getRecipes());
  }

  getRecipesFromDB(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.getRecipes());
  }

  ngOnInit(): void {
  }
}
