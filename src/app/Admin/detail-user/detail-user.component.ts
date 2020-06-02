import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  user: any;
  id: number;
  servicesOccupied: any;
  historiqueServicesOccupied: any;
  service_user: any;
  //totalElement: number;
  curentPage: number = 0;
  curentPageH: number = 0;
  size: number = 3;
  pages: Array<number>;
  pagesH: Array<number>;
  ownerAccount: User;
  email: string;
  constructor(private route: ActivatedRoute, private router: Router, public userService: UtilisateurService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.searchUserById(this.id)
      .subscribe(data => this.user = data);
    console.log("user de id" + this.id)
    this.getServicesOccupied();
    this.getHistoriqueServicesOccupied();
    this.getAccountOwner();

  }

  getAccountOwner() {
    this.email = sessionStorage.getItem('email');
    this.ownerAccount = new User();
    this.userService.searchUserByEmail(this.email)
      .subscribe(data => {
        this.ownerAccount = data;

      }

      );

  }

  getServicesOccupied() {
    this.userService.servicesOccupiedByUser(this.id, this.curentPage, this.size)
      .subscribe(data => {
        // this.service_user = data;
        this.servicesOccupied = data;
        // this.totalElement = this.service_user.totalElements;
        this.pages = new Array(this.servicesOccupied.totalPages)
        //this.servicesOccupied = [];
        /* for (let i = 0; i < this.totalElement; i++) {
          /*if (this.service_user.content[i].etat == true) {
             this.servicesOccupied.push(this.service_user.content[i]);
             console.log("true")
           }
           else if (this.service_user.content[i].etat == false) {
             this.historiqueServicesOccupied.push(this.service_user.content[i]);
             console.log("false")
           }
 
 
           //console.log("hist false" + this.historiqueServicesOccupied)
 
         }*/



      }, err => {

        console.log(err)
      })
  }
  getHistoriqueServicesOccupied() {
    this.userService.historiqueServicesOccupiedByUser(this.id, this.curentPageH, this.size)
      .subscribe(data => {

        this.historiqueServicesOccupied = data;

        this.pagesH = new Array(this.historiqueServicesOccupied.totalPages)



      }, err => {

        console.log(err)
      })
  }

  gotoPage(i: number) {
    this.curentPage = i;
    this.getServicesOccupied();

  }

  gotoPageH(i: number) {
    this.curentPageH = i;
    this.getHistoriqueServicesOccupied();

  }

  home() {
    this.router.navigate(['global']);
  }


  users() {
    this.router.navigate(['users']);
  }
}
