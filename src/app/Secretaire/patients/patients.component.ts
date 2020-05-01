import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientService } from 'src/app/service/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  pagePatient: any;
  motCle: string = "";
  curentPage: number = 0;
  size: number = 5;
  pages: Array<number>;


  constructor(private router: Router, private patService: PatientService, private http: HttpClient) { }

  ngOnInit(): void {
    this.doSearch();

  }
  doSearch() {
    this.patService.getPatients(this.motCle, this.curentPage, this.size)
      .subscribe(data => {
        this.pagePatient = data;
        this.pages = new Array(this.pagePatient.totalPages)


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

  detailPatient(id: number) {

    this.router.navigate(["/detailPatient", id]);
  }
  editPatient(id: number) {

    this.router.navigate(["/editPatient", id]);
  }

  exitPatient(id: number) {
    this.patService.exitPatient(id)
      .subscribe(
        data => {

          this.doSearch();

        },
        err => {

          console.log(err)
        })

  }
  deleteConfirme(c: any) {
    if (confirm("Voulier vous maruer la sortie du:  " + c.nom + " " + c.prenom + " du service " + c.service.nom)) {
      this.exitPatient(c.id);
      this.doSearch();
    }
  }
}
