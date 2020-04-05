import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../service/authentification.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Router } from "@angular/router";


//declare const validate: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  user: User;
  errorMessage: boolean;
  mode: number = 0;
  requiredFieldErr: boolean = false;
  constructor(private authService: AuthentificationService, private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
  }


  onLogin() {
    if (this.username || this.password) {
      this.authService.login(this.username, this.password)
        .subscribe(data => {
          this.user = data;


          this.errorMessage = false;
          this.router.navigate(["/global/" + this.user.id]);
          this.mode += 1;

        }, err => {

          this.errorMessage = true;
          this.router.navigate(["/login"]);
          this.mode += 1;
        })
      this.requiredFieldErr = false;
    }
    else {
      this.requiredFieldErr = true;
      this.mode = 0;
    }


  }
}