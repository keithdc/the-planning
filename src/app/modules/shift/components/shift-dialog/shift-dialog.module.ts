import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftDialogComponent } from './shift-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    ShiftDialogComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule
  ]
})
export class ShiftDialogModule { }
