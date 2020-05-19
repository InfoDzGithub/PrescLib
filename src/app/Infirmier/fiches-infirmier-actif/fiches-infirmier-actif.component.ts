import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientService } from 'src/app/service/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { User } from 'src/app/model/user';
import { PrescriptionServiceService } from 'src/app/service/prescription-service.service';
import { CareFileService } from 'src/app/service/care-file.service';
import { formatDate, DatePipe } from '@angular/common';
@Component({
  selector: 'app-fiches-infirmier-actif',
  templateUrl: './fiches-infirmier-actif.component.html',
  styleUrls: ['./fiches-infirmier-actif.component.css']
})
export class FichesInfirmierActifComponent implements OnInit {
  id: number;
  curentPage: number = 0;
  size: number = 2;
  pages: Array<number>;
  pageFilesCare: any;
  patientName: string;
  prescription: any;
  currentDay: Date = new Date();
  cValue: string;
  //
  curentPage2: number = 0;
  size2: number = 3;
  pages2: Array<number>;
  currentPageFilesCare: any;


  constructor(private fileService: CareFileService, private route: ActivatedRoute, public prescService: PrescriptionServiceService, private router: Router, private patService: PatientService, public userService: UtilisateurService, private http: HttpClient) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.actifFilesCare();
    this.getPresc();
    this.currentActifFilesCare();
  }

  actifFilesCare() {
    this.fileService.listActifFilesCareByPresc(this.id, this.curentPage, this.size)
      .subscribe(data => {
        this.pageFilesCare = data;

        this.pages = new Array(this.pageFilesCare.totalPages)
      }

      );

  }


  currentActifFilesCare() {
    this.fileService.currentCareFileByPrescription(this.id, this.curentPage2, this.size2)
      .subscribe(data => {
        this.currentPageFilesCare = data;

        this.pages2 = new Array(this.currentPageFilesCare.totalPages)
      }

      );

  }

  getPresc() {
    this.prescService.searchPresctById(this.id)
      .subscribe(data => {
        this.prescription = data;
        this.patientName = this.prescription.patient.nom + " " + this.prescription.patient.prenom


      }

      );

  }
  gotoPage(i: number) {
    this.curentPage = i;
    this.actifFilesCare();
    this.getPresc();
  }

  gotoPage2(i: number) {
    this.curentPage2 = i;
    this.currentActifFilesCare();
    this.getPresc();
  }

  home() {
    this.router.navigate(["/global"]);
  }
  PrescriptionActif(id: number) {
    this.router.navigate(["/PrescriptionActif", id]);
  }
}
