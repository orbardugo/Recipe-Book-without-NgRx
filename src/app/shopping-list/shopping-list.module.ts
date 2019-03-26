import {NgModule} from '@angular/core';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {ShoppingListComponent} from './shopping-list.component';
import {CommonModule} from '@angular/common';
import {ShoppingLisRoutingModule} from './shopping-lis-routing.module';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ShoppingEditComponent,
    ShoppingListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ShoppingLisRoutingModule
  ]
})
export class ShoppingListModule {}
