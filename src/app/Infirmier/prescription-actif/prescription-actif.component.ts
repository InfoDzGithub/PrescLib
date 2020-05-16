import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/service/patient.service';
import { PrescriptionServiceService } from 'src/app/service/prescription-service.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-prescription-actif',
  templateUrl: './prescription-actif.component.html',
  styleUrls: ['./prescription-actif.component.css']
})
export class PrescriptionActifComponent implements OnInit {

  actifPresc: any;
  curentPage: number = 0;
  size: number = 4;
  pages: Array<number>;
  idPatient: number;
  patient: any;
  constructor(private route: ActivatedRoute, public prescService: PrescriptionServiceService, private router: Router, private patService: PatientService, public userService: UtilisateurService) { }


  ngOnInit(): void {
    this.idPatient = this.route.snapshot.params['id'];
    this.listActifPrescByPatient()
    this.getPatient();
  }

  listActifPrescByPatient() {

    this.prescService.listActifPrescByPatient(this.idPatient, this.curentPage, this.size)
      .subscribe(
        data => {
          this.actifPresc = data;
          this.pages = new Array(this.actifPresc.totalPages)


        }

      );

  }

  gotoPage(i: number) {
    this.curentPage = i;
    this.listActifPrescByPatient();
    this.getPatient();
  }


  getPatient() {

    this.patService.searchPatientById(this.idPatient)
      .subscribe(
        data => {
          this.patient = data;


        }

      );

  }

  dossierMedical() {
    this.router.navigate(["/dossierMedical"]);
  }

  PrescriptionActif(id: number) {
    this.router.navigate(["/PrescriptionActif", id]);
  }

  detailPrescM(id: number) {

    this.router.navigate(["/detailMedicalPrescription", id]);
  }
  detailSoinPrescription(id: number) {

    this.router.navigate(["/detailSoinPrescription", id]);
  }

  detailSuiviPrescription(id: number) {

    this.router.navigate(["/detailSuiviPrescription", id]);
  }
  detailAlimentPrescription(id: number) {

    this.router.navigate(["/detailAlimentPrescription", id]);
  }

  home() {
    this.router.navigate(["/global"]);
  }



}
