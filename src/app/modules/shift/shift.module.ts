import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShiftComponent} from './shift.component';
import {ShiftRoutingModule} from './shift-routing.module';
import {ShiftDialogModule} from './components/shift-dialog/shift-dialog.module';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {SharedPipesModule} from '../../utils/pipes/shared-pipes.module';


@NgModule({
  declarations: [
    ShiftComponent
  ],
    imports: [
        CommonModule,
        ShiftRoutingModule,
        ShiftDialogModule,
        MatCardModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
        SharedPipesModule
    ]
})
export class ShiftModule {
}
