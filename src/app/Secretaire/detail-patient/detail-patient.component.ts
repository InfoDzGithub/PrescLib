import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.css']
})
export class DetailPatientComponent implements OnInit {

  patient: any;
  id: number;
  servicesHosp: any;
  curentPage: number = 0;
  size: number = 3;
  pages: Array<number>;
  constructor(private route: ActivatedRoute, private router: Router, public patService: PatientService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.patService.searchPatientById(this.id)
      .subscribe(data => this.patient = data);
    this.getServicesHospByPatient()
  }

  getServicesHospByPatient() {
    this.patService.servicesHospByPatient(this.id, this.curentPage, this.size)
      .subscribe(data => {

        this.servicesHosp = data;

        this.pages = new Array(this.servicesHosp.totalPages)


      }, err => {

        console.log(err)
      })
  }
  gotoPage(i: number) {
    this.curentPage = i;
    this.getServicesHospByPatient();

  }


}
