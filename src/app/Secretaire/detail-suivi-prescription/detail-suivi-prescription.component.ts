import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrescriptionServiceService } from 'src/app/service/prescription-service.service';
import { PatientService } from 'src/app/service/patient.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { Patient } from 'src/app/model/patient';
import { Prescription } from 'src/app/model/prescription';
@Component({
  selector: 'app-detail-suivi-prescription',
  templateUrl: './detail-suivi-prescription.component.html',
  styleUrls: ['./detail-suivi-prescription.component.css']
})
export class DetailSuiviPrescriptionComponent implements OnInit {

  prescription: any;
  id: number;

  constructor(private router: Router, private route: ActivatedRoute, private prescService: PrescriptionServiceService, private patService: PatientService, private userService: UtilisateurService) { }


  ngOnInit(): void {
    //this.prescription = new Prescription();
    this.id = this.route.snapshot.params['id'];
    this.prescService.searchPresctById(this.id)
      .subscribe(data => {
        this.prescription = data;
        console.log(this.prescription.contenu)
      }

      );

  }

  editPatient(id: number) {
    this.router.navigate(["/editPatient", id]);
  }

}


