import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UtilisateurService } from '../service/utilisateur.service';
import { User } from '../model/user';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  //template: ' <app-header [id]="id"></app-header>',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {
  id: number;
  message: number;
  email: string;
  user: User = new User();

  constructor(private route: ActivatedRoute,
    private router: Router, private userService: UtilisateurService) { }



  ngOnInit() {
    //this.id = +this.route.snapshot.params['id'];
    //this.authService.currentMessage.subscribe(message => this.message = message)
    this.email = sessionStorage.getItem('email');
    this.userService.searchUserByEmail(this.email)
      .subscribe(data => this.user = data);

  }


  settingUser(id: number) {

    this.router.navigate(["/parametre", id]);
  }

  goToUser() {
    this.router.navigate(["/users"]);
  }

  services() {
    this.router.navigate(["/services"]);
  }
}
