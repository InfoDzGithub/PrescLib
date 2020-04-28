import { Component, OnInit } from '@angular/core';
import { DepartementService } from 'src/app/service/departement.service';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: any;
  curentPage: number = 0;
  size: number = 4;
  total_pages: Array<number>;
  constructor(private router: Router, private depService: DepartementService, public userService: UtilisateurService) { }

  ngOnInit(): void {
    this.getAllServices();
  }


  getAllServices() {
    this.depService.getAllServices(this.curentPage, this.size)
      .subscribe(data => {
        this.services = data;
        this.total_pages = new Array(this.services.totalPages)


      }, err => {

        console.log(err)
      })
  }
  //pagination
  gotoPage(i: number) {
    this.curentPage = i;
    this.getAllServices();
  }



  //activer service
  enableService(id: number) {
    this.depService.enableService(id)
      .subscribe(
        data => {

          this.getAllServices();

        },
        err => {
          console.log(err)
        })

  }
  enableConfirme(c: any) {
    if (confirm("Vouliez vous activer: " + c.nom)) {
      this.enableService(c.id);
      this.getAllServices();
    }
  }

  //editer service
  editService(id: number) {

    this.router.navigate(["/editService", id]);
  }

  //desable service
  desableService(id: number) {
    this.depService.archiveService(id)
      .subscribe(
        data => {

          this.getAllServices();

        },
        err => {

          console.log(err)
        })

  }

  deleteConfirme(c: any) {
    if (confirm("Cette action va détacher Le service:  " + c.nom + " de tous ses patients ainsi ses utilisateur y inclut")) {
      this.desableService(c.id);
      this.getAllServices();
    }
  }


}
