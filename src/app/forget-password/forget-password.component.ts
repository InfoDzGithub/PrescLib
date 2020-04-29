import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../service/authentification.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  email: string = '';
  forgetPwdForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthentificationService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  /*
    onForgetPassword() {
      if (this.username != '') {
        this.authService.forgetPassword(this.username)
          .subscribe(
            data => {
              this.checkEmailBox();
            },
            err => {
  
              this.boiteDialoge("Il y a pas de compte PrescLib avec ce pseudo")
            })
  
      }
      else {
  
        this.boiteDialoge("Remplissez le champ vide svp")
      }
      console.log(this.username);
  
  
    }
  */
  // init form
  initForm() {
    this.forgetPwdForm = this.formBuilder.group({

      username: ['', [Validators.required, Validators.email]],

    });
  }

  //meth forgetpwd
  onForgetPassword() {
    const formValue = this.forgetPwdForm.value;
    this.email = formValue['username'];
    console.log(this.email);
    this.authService.forgetPassword(this.email)
      .subscribe(
        data => {
          this.checkEmailBox();
        },
        err => {

          this.boiteDialoge("Il y a pas de compte PrescLib avec ce pseudo")
        })



  }
  checkEmailBox() {

    if (confirm("Vérifier votre email pour se connecter à PrescLip: ")) {
      this.router.navigate(["/login"]);
    }
  }
  boiteDialoge(message: string) {

    if (confirm(message)) {

    }
  }
}
