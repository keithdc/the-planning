import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanningComponent} from './planning.component';
import {PlanningRoutingModule} from './planning-routing.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {ReactiveFormsModule} from '@angular/forms';
import {PlanningDialogModule} from './components/planning-dialog/planning-dialog.module';


@NgModule({
  declarations: [
    PlanningComponent
  ],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    MatGridListModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatDividerModule,
    ReactiveFormsModule,
    PlanningDialogModule
  ]
})
export class PlanningModule {
}
