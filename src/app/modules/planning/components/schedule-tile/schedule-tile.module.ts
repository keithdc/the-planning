import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ScheduleTileComponent} from './schedule-tile.component';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    ScheduleTileComponent
  ],
  exports: [
    ScheduleTileComponent
  ],
  imports: [
    CommonModule,
    FlexModule
  ],
  providers: [
    DatePipe
  ]
})
export class ScheduleTileModule {
}
