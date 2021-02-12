import { Component, ViewChild,} from '@angular/core';
import { FormsModule,NgForm} from '@angular/forms';
import { Router, ActivatedRoute, UrlTree } from "@angular/router";
import { RecoverpasswordService } from './_services/recoverpassword.service';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert2';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent {

  urlTree: UrlTree
    urlWindow = '';
    url = '';
    encontrado=false;
    public email:string;
    @ViewChild('f', {static: false}) forogtPasswordForm: NgForm;
        constructor(
          private router: Router,
          private route: ActivatedRoute,
          private spinner: NgxSpinnerService,
          private passService: RecoverpasswordService
        ) {
          this.urlWindow = window.location.href;
          this.url = this.urlWindow.replace('recuperarpassword', 'restablecerpassword');
         }

    onSubmit() {
      this.spinner.show();
      console.log(this.email, this.url);
      return this.passService.recoverPass(this.email, this.url)
        .subscribe( () => {
          swal.fire({
            icon: 'success',
            title: '¡Listo!',
            text: 'Se ha enviado la información a tu correo',
            showConfirmButton: false,
            timer: 4000,
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false,
          });
          setTimeout(() => {
            this.router.navigate(['/login']);
            this.spinner.hide();
          }, 4000);
        },
        (error: any) => {
          this.spinner.hide();
          swal.fire({
            title: "¡Error!",
            text: "Correo no encontrado",
            icon: "error",
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false,
          });
        });
    }

    // On login link click
    onLogin() {
        this.router.navigate(['/login'], { relativeTo: this.route.parent });
    }

}
