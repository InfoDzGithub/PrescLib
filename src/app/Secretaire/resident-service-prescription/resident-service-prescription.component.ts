import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../service/patient.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

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
  constructor(private route: ActivatedRoute, private router: Router, public userService: UtilisateurService, public patService: PatientService) { }

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

}
