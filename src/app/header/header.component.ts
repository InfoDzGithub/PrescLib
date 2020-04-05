import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthentificationService,
    private router: Router) { }


  ngOnInit() {

  }
  onLogout() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
