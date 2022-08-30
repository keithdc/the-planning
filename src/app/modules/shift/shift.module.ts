import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShiftComponent} from './shift.component';
import {ShiftRoutingModule} from './shift-routing.module';


@NgModule({
  declarations: [
    ShiftComponent
  ],
  imports: [
    CommonModule,
    ShiftRoutingModule
  ]
})
export class ShiftModule {
}
