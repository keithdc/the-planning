import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeComponent} from './employee.component';
import {EmployeeRoutingModule} from './employee-routing.module';
import {MatListModule} from '@angular/material/list';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {EmployeeDialogModule} from './components/employee-dialog/employee-dialog.module';


@NgModule({
  declarations: [
    EmployeeComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatListModule,
    FlexModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    EmployeeDialogModule
  ],
})
export class EmployeeModule {
}
