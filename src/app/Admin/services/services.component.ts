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
        //this.pageUser = data;
        this.services = data;
        this.total_pages = new Array(this.services.totalPages)


      }, err => {

        console.log(err)
      })
  }

  gotoPage(i: number) {
    this.curentPage = i;
    this.getAllServices();
  }

  editService(id: number) {

    this.router.navigate(["/editService", id]);
  }

}
