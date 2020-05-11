import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartementService } from 'src/app/service/departement.service';
import { PatientService } from 'src/app/service/patient.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { Patient } from 'src/app/model/patient';
import { ActivatedRoute, Router } from '@angular/router';
import { Prescription } from 'src/app/model/prescription';
import { User } from 'src/app/model/user';
import { Traitement } from 'src/app/model/traitement';
import { PrescriptionServiceService } from 'src/app/service/prescription-service.service';
import { Contenu } from 'src/app/model/contenu';
import { Service } from 'src/app/model/service';
import { Tests } from 'src/app/model/tests';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit {

  id: number;
  idP: number;
  test: Tests;
  traitementForm: FormGroup;
  prescription: Prescription;
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private prescService: PrescriptionServiceService, private patService: PatientService, private userService: UtilisateurService) { }


  ngOnInit(): void {
    this.test = new Tests();
    this.id = this.route.snapshot.params['idT'];
    this.idP = this.route.snapshot.params['idP'];
    this.prescService.searchTestById(this.id)
      .subscribe(data => {
        this.test = data;

      });

    this.initForm();
    this.getPrescription();



  }

  getPrescription() {
    this.prescService.searchPresctById(this.idP)
      .subscribe(data => {
        this.prescription = data;
      });
  }
  initForm() {
    this.traitementForm = this.fb.group({
      nomTest: ['', Validators.required],
      rythme: ['', Validators.pattern("[0-9 ]{1}")],
      remarque: ['', Validators.required]


    });
  }

  editTest() {

    const formValueAff = this.traitementForm.value;


    this.test.nom_test = formValueAff['nomTest'];
    this.test.nbre_par_jr = formValueAff['rythme'];
    this.test.remarque = formValueAff['remarque'];
    this.test.prescription = this.prescription;

    this.prescService.editTest(this.test, this.test.id)
      .subscribe(data => {

        this.infoBox("Le test a bien été modifié");



      }, err => {
        this.infoBox("Desolé! le test n'a pas été modifié");


      })
  }

  infoBox(message: string) {

    if (confirm(message)) {
      this.router.navigate(["/editSuiviPrescription", this.idP]);

    }
  }

  return() {
    this.router.navigate(["/editSuiviPrescription", this.idP]);

  }



}
