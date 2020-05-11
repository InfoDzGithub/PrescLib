import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UtilisateurService } from '../service/utilisateur.service';
import { Router } from '@angular/router';
import { UsersComponent } from '../Admin/users/users.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: User = new User();
  email: string;

  pageUser: any;
  motCle: string = "";
  curentPage: number = 0;
  size: number = 5;
  pages: Array<number>;
  constructor(private userService: UtilisateurService,
    private router: Router) { }


  ngOnInit() {
    this.email = sessionStorage.getItem('email');
    console.log("email: " + this.email)
    this.userService.searchUserByEmail(this.email)
      .subscribe(data => this.user = data);
    //console.log("nomComplet: " + this.user.nom)

  }

  gotoUsers() {
    this.router.navigate(["/users"]);
    this.userService.getUsers(this.motCle, this.curentPage, this.size)
      .subscribe(data => {
        this.pageUser = data;
        this.pages = new Array(this.pageUser.totalPages)


      }, err => {

        console.log(err)
      })

  }

  profileUser(id: number) {

    this.router.navigate(["/detailUser", id]);
  }

  settingUser(id: number) {

    this.router.navigate(["/parametre", id]);
  }

  home() {
    this.router.navigate(["/global"]);
  }
  services() {
    this.router.navigate(["/services"]);
  }
  gotoPatients() {
    this.router.navigate(["/patients"]);
    /* this.userService.getUsers(this.motCle, this.curentPage, this.size)
       .subscribe(data => {
         this.pageUser = data;
         this.pages = new Array(this.pageUser.totalPages)
 
 
       }, err => {
 
         console.log(err)
       })*/

  }

  searchTraitement() {
    this.router.navigate(["/searchTraitement"]);
  }
}
