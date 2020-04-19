import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  user: any;
  id: number;
  servicesOccupied = [];
  historiqueServicesOccupied = [];
  service_user: any;
  totalElement: number;
  curentPage: number = 0;
  size: number = 3;
  pages: Array<number>;
  constructor(private route: ActivatedRoute, private router: Router, private userService: UtilisateurService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.searchUserById(this.id)
      .subscribe(data => this.user = data);
    console.log("user de id" + this.id)
    this.getServicesOccupied();

  }

  getServicesOccupied() {
    this.userService.servicesOccupiedByUser(this.id, this.curentPage, this.size)
      .subscribe(data => {
        this.service_user = data;
        this.totalElement = this.service_user.numberOfElements;
        this.pages = new Array(this.service_user.totalPages)
        for (let i = 0; i < this.totalElement; i++) {

          if (this.service_user.content[i].etat == true) { this.servicesOccupied.push(this.service_user.content[i]); }
          else if (this.service_user.content[i].etat == false) { this.historiqueServicesOccupied.push(this.service_user.content[i]); }

          console.log("obj user" + this.servicesOccupied)
          console.log("obj etat" + this.servicesOccupied[i].etat)

        }



      }, err => {

        console.log(err)
      })
  }

  gotoPage(i: number) {
    this.curentPage = i;
    this.userService.servicesOccupiedByUser(this.id, this.curentPage, this.size)
      .subscribe(data => {
        this.service_user = data;
        this.totalElement = this.service_user.numberOfElements;
        this.pages = new Array(this.service_user.totalPages)



      }, err => {

        console.log(err)
      })
  }
}
