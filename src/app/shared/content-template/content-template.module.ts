import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTemplateComponent } from './content-template.component';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    ContentTemplateComponent
  ],
  exports: [
    ContentTemplateComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class ContentTemplateModule { }
