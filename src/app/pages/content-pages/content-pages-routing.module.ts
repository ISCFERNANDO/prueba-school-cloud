import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from "./error/error-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error',
        component: ErrorPageComponent,
        data: {
          title: 'Error Page'
        }
      },
      {
        path: 'recuperarpassword',
        component: ForgotPasswordPageComponent,
        data: {
          title: 'Recuperar password'
        }
      },
      {
        path: 'restablecerpassword',
        component: ResetPasswordComponent,
        data: {
          title: 'Reiniciar password'
        }
      },
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login '
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
