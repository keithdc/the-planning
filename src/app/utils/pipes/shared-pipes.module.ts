import {NgModule} from '@angular/core';
import {ToTimePipe} from './to-time.pipe';

const Pipes = [
  ToTimePipe,
];

@NgModule({
  declarations: [
    ...Pipes
  ],
  imports: [],
  providers: [
    ...Pipes
  ],
  exports: [
    ...Pipes
  ],
})
export class SharedPipesModule {
}
