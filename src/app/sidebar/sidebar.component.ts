import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UtilisateurService } from '../service/utilisateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: any;
  email: string;
  constructor(private userService: UtilisateurService,
    private router: Router) { }


  ngOnInit() {
    this.email = sessionStorage.getItem('email');
    console.log("email: " + this.email)
    this.userService.searchUserByEmail(this.email)
      .subscribe(data => this.user = data);
    console.log("nomComplet: " + this.user.nom)

  }
}
