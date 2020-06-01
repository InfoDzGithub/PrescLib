import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/service/patient.service';
import { PrescriptionServiceService } from 'src/app/service/prescription-service.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { CareFileService } from 'src/app/service/care-file.service';

@Component({
  selector: 'app-dossier-sby-presc',
  templateUrl: './dossier-sby-presc.component.html',
  styleUrls: ['./dossier-sby-presc.component.css']
})
export class DossierSByPrescComponent implements OnInit {
  id: number;
  curentPage: number = 0;
  size: number = 3;
  pages: Array<number>;
  filesCare: any;
  presc: any;
  constructor(private fileService: CareFileService, private route: ActivatedRoute, public prescService: PrescriptionServiceService, private router: Router, private patService: PatientService, public userService: UtilisateurService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getFilesByPresc();
    this.getPresc();
  }

  getFilesByPresc() {

    this.fileService.fileByPresc(this.id, this.curentPage, this.size)
      .subscribe(data => {
        this.filesCare = data;
        this.pages = new Array(this.filesCare.totalPages)

      }, err => {


      })

  }

  getPresc() {

    this.prescService.searchPresctById(this.id)
      .subscribe(data => {
        this.presc = data;


      }, err => {


      })

  }

  gotoPage(i: number) {
    this.curentPage = i;
    this.getFilesByPresc();
  }



  goToHome() {
    this.router.navigate(["/global"]);
  }
  detailPatient(id: number) {
    this.router.navigate(["/detailPatient", id]);
  }

  detailFileMDCL(id: number) {
    this.router.navigate(["/editFicheSoin", id]);

  }

  detailFileSuivi(id: number) {
    this.router.navigate(["/editFicheSoinSuivi", id]);

  }

  detailFileSoin(id: number) {
    this.router.navigate(["/editFicheSoinReel", id]);

  }

  detailFileALMT(id: number) {
    this.router.navigate(["/editFicheSoinAliment", id]);

  }
}
