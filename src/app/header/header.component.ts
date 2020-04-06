import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../service/authentification.service';
import { UtilisateurService } from '../service/utilisateur.service';
import { User } from '../model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Input() id: number;
  user: User;
  email: string;
  constructor(public authService: AuthentificationService, private userService: UtilisateurService,
    private router: Router) { }


  ngOnInit() {
    this.email = sessionStorage.getItem('email');
    console.log("email: " + this.email)
    this.userService.searchUserByEmail(this.email)
      .subscribe(data => this.user = data);
    console.log("nomComplet: " + this.user.nom)

    /* this.userService.searchUserById(this.id)
       .subscribe(data => this.user = data);*/
  }
  onLogout() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
