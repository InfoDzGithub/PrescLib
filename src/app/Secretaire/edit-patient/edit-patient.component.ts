import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/service/patient.service';
import { DepartementService } from 'src/app/service/departement.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  patient: Patient;
  patientForm: FormGroup;
  id: number;
  patientSaved: any;


  constructor(private router: Router, private route: ActivatedRoute, private depService: DepartementService, private patService: PatientService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.patient = new Patient();
    this.id = this.route.snapshot.params['id'];
    this.patService.searchPatientById(this.id)
      .subscribe(data => this.patient = data);
    this.initForm();

  }

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



    });
  }


  onSubmitForm() {
    const formValue = this.patientForm.value;


    this.patient.nom = formValue['lastName'];
    this.patient.prenom = formValue['firstName'];
    let a = formValue['cni'];
    this.patient.cni = formValue['cni'];
    this.patient.date_naissance = formValue['dateNaissance'];
    this.patient.profession = formValue['profession'];
    this.patient.telephone = formValue['telephone'];
    this.patient.sexe = formValue['sexe'];
    this.patient.group_sanguin = formValue['gsanguin'];
    this.patient.adress = formValue['adress'];

    this.patService.editPatient(this.patient, this.id)
      .subscribe(data => {
        this.patientSaved = data;
        this.infoBox("Le patient a été modifier avec succes");
        this.router.navigate(["/detailPatient", this.id]);

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
