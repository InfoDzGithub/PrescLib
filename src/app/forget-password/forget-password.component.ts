import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../service/authentification.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Router } from "@angular/router";
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  username: string = '';
  errMsg: boolean = false;
  mode: number = 0;
  emailCheckBox: boolean = false;
  constructor(private authService: AuthentificationService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }


  onForgetPassword() {
    if (this.username != '') {
      this.authService.forgetPassword(this.username)
        .subscribe(
          data => {
            // this.emailMessage = true;
            //this.errMsg = false;
            // this.username='';
            //this.mode = 1;
            this.checkEmailBox();
          },
          err => {
            // this.mode = 1;
            // this.errMsg = true;
            this.boiteDialoge("Il y a pas de compte PrescLib avec ce pseudo")
          })
      //this.emailCheckBox = false;
      //this.username = '';
    }
    else {
      // this.mode = 0;
      //this.emailCheckBox = true;
      this.boiteDialoge("Remplissez le champ vide svp")
    }
    console.log(this.username);
    //  .subscribe(() => this.router.navigate(["/login"]));

    //this.router.navigate(["/login"]);

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
