import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {CoreRoute} from './utils/core-route';


const routes: Routes = [
  {
    path: CoreRoute.PLANNING,
    loadChildren: () => import('./modules/planning/planning.module').then(m => m.PlanningModule),
  },
  {
    path: CoreRoute.EMPLOYEE,
    pathMatch: 'full',
    loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule),
  },
  {
    path: CoreRoute.SHIFT,
    loadChildren: () => import('./modules/shift/shift.module').then(m => m.ShiftModule),
  },
  {path: '', redirectTo: CoreRoute.PLANNING, pathMatch: 'full'},
  {
    path: '**',
    loadChildren: () => import('./modules/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
