import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  pageUser: any;
  motCle: string = "";
  curentPage: number = 0;
  size: number = 5;
  pages: Array<number>;

  constructor(private router: Router, private userService: UtilisateurService, private http: HttpClient) { }

  ngOnInit(): void {
    this.doSearch();

  }
  doSearch() {
    this.userService.getUsers(this.motCle, this.curentPage, this.size)
      .subscribe(data => {
        this.pageUser = data;
        this.pages = new Array(this.pageUser.totalPages)


      }, err => {

        console.log(err)
      })
  }
  chercher() {
    this.doSearch();
  }
  gotoPage(i: number) {
    this.curentPage = i;
    this.doSearch();
  }

  desableUser(id: number) {
    this.userService.archive(id)
      .subscribe(
        data => {
          this.releaseAllHisFonctionality(id);
          //console.log("delete" + data + "id" + id)
          this.doSearch();

        },
        err => {

          console.log(err)
        })

  }

  enableUser(id: number) {
    this.userService.enable(id)
      .subscribe(
        data => {

          console.log("enable" + data + "id" + id)
          this.doSearch();

        },
        err => {
          // this.mode = 1;
          //this.errMsg = true;
          console.log(err)
        })

  }

  enableConfirme(c: any) {
    if (confirm("Vouliez vous activer: " + c.nom + " " + c.prenom)) {
      this.enableUser(c.id);
      this.doSearch();
    }
  }

  deleteConfirme(c: any) {
    if (confirm("Cette action va détacher L'utilisateur:  " + c.nom + " " + c.prenom + " de tous les services y appartient")) {
      this.desableUser(c.id);
      this.doSearch();
    }
  }

  releaseAllHisFonctionality(id: number) {
    this.userService.releaseUserFromAllActifService(id)
      .subscribe(data => {
      }, err => {

        console.log(err)
      })

  }

  detailUser(id: number) {

    this.router.navigate(["/detailUser", id]);
  }
}
