import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private SlService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.SlService.startedEditingItem.subscribe((ingredientIndex: number) => {
      this.editMode = true;
      this.editedItemIndex = ingredientIndex;
      this.editedItem = this.SlService.getIngredient(this.editedItemIndex);
      this.ingredientForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onSubmit() {
    const value = this.ingredientForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.SlService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.SlService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  onDeleteItem() {
    this.SlService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;

  }
}
