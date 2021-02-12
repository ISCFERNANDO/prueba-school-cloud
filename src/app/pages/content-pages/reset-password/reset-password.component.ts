import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from './_models/user';
import { RecoverpasswordService } from './_services/recoverpassword.service';
import { PasswordValidator } from './_validators/password-validator';
import { Router, UrlTree } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public myGroup: FormGroup;

  user: User = {
    email: null,
    password: null,
    password_confirmation: null,
    token: '',

  };

  token = '';
  urlTree: UrlTree

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private passService: RecoverpasswordService,
    private fb: FormBuilder

    ) {
    this.urlTree = router.parseUrl(router.url);
    this.myGroup = this.createSignupForm();
    this.token = this.urlTree.queryParams['token'];

   }

  ngOnInit(): void {

  }
  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        email: [
          null,
          Validators.compose([Validators.pattern(this.emailPattern), Validators.required])
        ],
        password: [
          null,
          Validators.compose([Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{7,}',)])
        ],
        password_confirmation: [null, Validators.compose([Validators.required])],

      },
      {
        validator: PasswordValidator.passwordMatchValidator
      }
    );
  }

  savePassword(){

    this.spinner.show();
    if (this.myGroup.valid) {
      this.user = {
        email: this.myGroup.value['email'],
        password: this.myGroup.value['password'],
        password_confirmation: this.myGroup.value['password_confirmation'],
        token: this.token
      }
  } else {
    this.spinner.hide();
    swal.fire({
      title: "¡Error!",
      text: "Ha ocurrido error en los campos",
      icon: "warning",
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false,
    });
  }
      this.passService.updatePassword(this.user).subscribe( (data) => {
        swal.fire({
          icon: 'success',
          title: 'Listo!',
          text: 'tu contraseña se modificó corretamente',
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
        }, 6000);
    },
    (error) => {
      console.log(error);
      swal.fire({
        title: "¡Error!",
        text: "Imposible modificar la contraseña",
        icon: "warning",
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false,
      });
    });
}


}
