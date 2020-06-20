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
import { Tests } from 'src/app/model/tests';
import { Service } from 'src/app/model/service';

@Component({
  selector: 'app-edit-aliment-prescription',
  templateUrl: './edit-aliment-prescription.component.html',
  styleUrls: ['./edit-aliment-prescription.component.css']
})
export class EditAlimentPrescriptionComponent implements OnInit {

  public form: FormGroup;
  public contactList: FormArray;
  servicesOcc: any;
  doctors: any;
  ownerAccount: User;
  email: string;
  //prescription:Prescription
  id: number;
  prescription: Prescription;
  prescriptionSaved: any;
  service: Service;
  medecin: string;

  get contactFormGroup() {
    return this.form.get('contacts') as FormArray;
  }

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private prescService: PrescriptionServiceService, private depService: DepartementService, private patService: PatientService, private userService: UtilisateurService) { }

  ngOnInit() {
    this.prescription = new Prescription();
    this.id = this.route.snapshot.params['id'];
    this.prescService.searchPresctById(this.id)
      .subscribe(data => {
        this.prescription = data;
        this.service = this.prescription.service;
        this.medecin = this.prescription.medecin.nom + " " + this.prescription.medecin.prenom;


      }

      );



    this.form = this.fb.group({
      servicePresc: [null, Validators.compose([Validators.required])],
      doctorPresc: [null, Validators.compose([Validators.required])],
      aliment: ['', Validators.required],
    });

    // set contactlist to this field
    this.contactList = this.form.get('contacts') as FormArray;
    this.getAccountOwner();
  }




  getAccountOwner() {
    this.email = sessionStorage.getItem('email');
    this.ownerAccount = new User();
    this.userService.searchUserByEmail(this.email)
      .subscribe(data => {
        this.ownerAccount = data;
        this.getServicesOccBySec();
      }

      );

  }

  //get services in witch receptioniste work
  getServicesOccBySec() {
    this.patService.ListServicesOccupiedByUser(this.ownerAccount.id)
      .subscribe(data => {
        this.servicesOcc = data;

      }, err => {

        console.log(err)
      })
  }
  //get doctors by services
  doctorsOfSelectedService(idS: number) {
    this.patService.doctorsOFSelectedService(idS)
      .subscribe(data => {
        this.doctors = data;



      }, err => {

        console.log(err)
      })
  }



  // method triggered when form is submitted
  submit() {
    console.log(this.form.value);
    const formValue = this.form.value;

    this.prescription.patient = this.prescription.patient;
    this.prescription.medecin = formValue['doctorPresc'];
    this.prescription.service = formValue['servicePresc'];
    //this.prescription.secretaire = this.ownerAccount;
    this.prescription.type_aliment = formValue['aliment'];
    this.prescription.type_presc = "ALMT";
    this.prescription.type = "ALMT";

    this.prescService.addPrescription(this.prescription)
      .subscribe(data => {
        this.prescriptionSaved = data;




        this.infoBox("La prescription a été modifié avec succes");
        //===>rediriger vers détaille
        this.router.navigate(["/detailAlimentPrescription", this.prescriptionSaved.id]);

      }, err => {
        this.infoBox("Desolé! prescription n'a pas été modifié");
        //this.router.navigate(["/patients"]);

      })


  }

  infoBox(message: string) {

    if (confirm(message)) {

    }
  }




  editPatient(id: number) {
    this.router.navigate(["/editPatient", id]);
  }

  detailAlimentPrescription(idP: number) {
    this.router.navigate(["/detailAlimentPrescription", idP]);

  }


}