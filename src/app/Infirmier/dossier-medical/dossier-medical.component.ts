import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientService } from 'src/app/service/patient.service';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { User } from 'src/app/model/user';
import { PrescriptionServiceService } from 'src/app/service/prescription-service.service';

@Component({
  selector: 'app-dossier-medical',
  templateUrl: './dossier-medical.component.html',
  styleUrls: ['./dossier-medical.component.css']
})
export class DossierMedicalComponent implements OnInit {
  patientActif: any;
  motCle: string = "";
  curentPage: number = 0;
  size: number = 5;
  pages: Array<number>;
  email: string;
  ownerInfirmierAccount: User = new User();
  //nbrePresc: Array<number>;
  nbre: number;
  constructor(public prescService: PrescriptionServiceService, private router: Router, private patService: PatientService, public userService: UtilisateurService, private http: HttpClient) { }

  ngOnInit(): void {
    this.ownerAccount();
    //console.log("nbre" + this.prescService.nbrePrescriptionActifByPatient(4))

  }

  getPatientActifByAcces() {

    this.patService.patientActifByUserAcces(this.ownerInfirmierAccount.id, this.curentPage, this.size)
      .subscribe(data => {
        this.patientActif = data;
        this.pages = new Array(this.patientActif.totalPages)
        /* this.nbrePresc = new Array()
         for (let index = 0; index < this.patientActif.totalElements; index++) {
 
 
 
           this.prescService.nbrePrescriptionActifByPatient(this.patientActif.content[index].patient.id)
             .subscribe(
               data => {
                 this.nbrePresc.push(data);
                 console.log("tab" + this.nbrePresc)
               }
 
             );
 
 
 
 
 
         }*/

      }, err => {

        console.log(err)
      })

  }

  ownerAccount() {
    this.email = sessionStorage.getItem('email');

    this.userService.searchUserByEmail(this.email)
      .subscribe(
        data => {
          this.ownerInfirmierAccount = data;
          this.getPatientActifByAcces();
        }

      );

  }





  gotoPage(i: number) {
    this.curentPage = i;
    this.getPatientActifByAcces();
  }

  detailPatient(id: number) {
    this.router.navigate(["/detailPatient", id]);
  }

  prescriptionActif(id: number) {
    this.router.navigate(["/PrescriptionActif", id]);
  }

  home() {
    this.router.navigate(["/global"]);
  }

  alert(id: number) {

    this.prescService.nbrePrescriptionActifByPatient(id)
      .subscribe(
        data => {
          this.nbre = data;
          window.alert("Le nbre de prescription actif: " + this.nbre);

        }

      );





  }



}


