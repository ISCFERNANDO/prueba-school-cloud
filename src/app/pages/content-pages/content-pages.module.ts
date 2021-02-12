import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { ErrorPageComponent } from "./error/error-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule ,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule
    ],
    declarations: [
        ErrorPageComponent,
        LoginPageComponent,
        ForgotPasswordPageComponent,
        ResetPasswordComponent
    ]
})
export class ContentPagesModule { }
