import {Ingredient} from '../shared/ingredient.model';
import {Injectable, OnInit} from '@angular/core';
import { Subject} from 'rxjs';
import {RepositoryService} from '../shared/repository.service';

@Injectable()
export class ShoppingListService implements OnInit {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditingItem = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];


  constructor() {}

  ngOnInit() {

  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }
  addIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingredientsChanged.next(this.getIngredients());

  }

  addIngredints(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.getIngredients());


  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.getIngredients());
  }

  getShoppingListToDB(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.ingredientsChanged.next(this.getIngredients());
  }
}
