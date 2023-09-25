import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from './app.constants';
import { authGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {
    path: APP_CONSTANTS.ROUTES.registration,
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: APP_CONSTANTS.ROUTES.profile,
    canActivate: [authGuardGuard],
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
