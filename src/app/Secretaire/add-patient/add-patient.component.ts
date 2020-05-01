import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/service/patient.service';
import { DepartementService } from 'src/app/service/departement.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  patient: Patient;
  patientForm: FormGroup;
  //services: any;
  patientSaved: any;


  constructor(private router: Router, private depService: DepartementService, private patService: PatientService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.initForm();
    //this.getServices();
  }
  /*
    getServices() {
      this.depService.getServices()
        .subscribe(data => {
          this.services = data;
  
          console.log(this.services)
  
  
        }, err => {
  
          console.log(err)
        })
    }*/


  initForm() {
    this.patientForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cni: ['', [Validators.pattern("[0-9 ]{6}")]],
      dateNaissance: ['', Validators.required],
      profession: ['', Validators.required],
      adress: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern("[0-9 ]{11}")]],
      sexe: ['', Validators.required],
      gsanguin: ['', Validators.required]
      //service: ['']  //, Validators.required]



    });
  }


  onSubmitForm() {
    const formValue = this.patientForm.value;

    this.patient = new Patient();
    this.patient.nom = formValue['lastName'];
    this.patient.prenom = formValue['firstName'];
    let a = formValue['cni'];
    console.log("a" + typeof +a + "valeur" + a);
    this.patient.cni = formValue['cni'];//parseInt('a', 10);

    this.patient.date_naissance = formValue['dateNaissance'];
    this.patient.profession = formValue['profession'];
    this.patient.telephone = formValue['telephone'];
    this.patient.sexe = formValue['sexe'];
    this.patient.group_sanguin = formValue['gsanguin'];
    this.patient.adress = formValue['adress'];
    //this.patient.service = formValue['service'];

    this.patService.addPatient(this.patient)
      .subscribe(data => {
        this.patientSaved = data;
        this.infoBox("Le patient a été ajouté avec succes");
        this.router.navigate(["/editPatient", this.patientSaved.id]);

      }, err => {
        this.infoBox("Desolé! patient n'a pas été ajouté, vérifier s'il est nouveau ");
        this.router.navigate(["/patients"]);

      })
  }



  infoBox(message: string) {

    if (confirm(message)) {

    }
  }

}
