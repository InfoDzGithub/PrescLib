import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../service/patient.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { PrescriptionServiceService } from 'src/app/service/prescription-service.service';
import { Prescription } from 'src/app/model/prescription';

@Component({
  selector: 'app-resident-service-prescription',
  templateUrl: './resident-service-prescription.component.html',
  styleUrls: ['./resident-service-prescription.component.css']
})
export class ResidentServicePrescriptionComponent implements OnInit {


  id: number;
  curentPage: number = 0;
  size: number = 3;
  pages: Array<number>;
  currentResidentS: any;
  Hpatient: any;
  email: string;
  ownerAccount: any;
  constructor(private prescService: PrescriptionServiceService, private route: ActivatedRoute, private router: Router, public userService: UtilisateurService, public patService: PatientService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.doSearch();
    this.getOneHist();

    this.email = sessionStorage.getItem('email');
    this.userService.searchUserByEmail(this.email)
      .subscribe(data => this.ownerAccount = data);

  }

  doSearch() {
    this.patService.allPrescriptionInCurrentService(this.id, this.curentPage, this.size)
      .subscribe(data => {
        this.currentResidentS = data;
        this.pages = new Array(this.currentResidentS.totalPages)

      });
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
  editMedicalPrescription(id: number) {

    this.router.navigate(["/editMedicalPrescription", id]);
  }
  editSuiviPrescription(id: number) {

    this.router.navigate(["/editSuiviPrescription", id]);
  }
  editSoinPrescription(id: number) {

    this.router.navigate(["/editSoinPrescription", id]);
  }
  editAlimentPrescription(id: number) {

    this.router.navigate(["/editAlimentPrescription", id]);
  }
  goToHome() {
    this.router.navigate(["/global"]);
  }


  gotoPage(i: number) {
    this.curentPage = i;
    this.doSearch();

  }

  editPatient(id: number) {
    this.router.navigate(["/detailPatient", id]);
  }
  getOneHist() {
    this.patService.getOneH(this.id)
      .subscribe(data => {
        this.Hpatient = data;

      });
  }

  goToFileCareByPresc(id: number) {
    this.router.navigate(["/fileCareByPresc", id]);
  }

  archivePresc(c: Prescription) {
    if (confirm("Vouliez vous stoper la prescription de type: " + c.type)) {
      this.prescService.archivePresc(c.id)
        .subscribe(data => {

          this.ngOnInit()
        }
          , err => {


          })
    }
  }
}
