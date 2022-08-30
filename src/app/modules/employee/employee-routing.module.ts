import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {CoreRoute} from '../../utils/core-route';
import {EmployeeComponent} from './employee.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {
}
