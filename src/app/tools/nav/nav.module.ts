import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    NavComponent
  ],
  exports: [
    NavComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatButtonModule
  ]
})
export class NavModule { }
