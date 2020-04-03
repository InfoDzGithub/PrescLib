import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../service/authentification.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Router } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';

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
  constructor(private authService: AuthentificationService, private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
  }


  onLogin() {

    this.authService.login(this.username, this.password)
      .subscribe(data => {
        this.user = data;

        this.router.navigate(["/global/" + this.user.id]);
        this.errorMessage = false;
        this.mode += 1;

      }, err => {
        this.router.navigate(["/login"]);
        this.errorMessage = true;
        this.mode += 1;
      })


  }
}