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
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';


@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})
export class AddPrescriptionComponent implements OnInit {

  public form: FormGroup;
  public contactList: FormArray;
  servicesOcc: any;
  doctors: any;
  ownerAccount: User;
  email: string;
  patient: Patient;
  id: number;
  prescription: Prescription;
  prescriptionSaved: any;
  traitement: Traitement;
  listTraitement: any;


  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get('contacts') as FormArray;
  }

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private prescService: PrescriptionServiceService, private depService: DepartementService, private patService: PatientService, private userService: UtilisateurService) { }

  ngOnInit() {
    this.patient = new Patient();
    this.id = this.route.snapshot.params['id'];
    this.patService.searchPatientById(this.id)
      .subscribe(data => {
        this.patient = data;
      }

      );



    this.form = this.fb.group({
      servicePresc: [null, Validators.compose([Validators.required])],
      doctorPresc: [null, Validators.compose([Validators.required])],
      contacts: this.fb.array([this.createContact()])
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










  // contact formgroup
  createContact(): FormGroup {
    return this.fb.group({
      medicament: ['', Validators.compose([Validators.required])],
      voix: ['', Validators.compose([Validators.required])], // i.e Email, Phone
      rythme: [null], // , [Validators.pattern("[0-9 ]{1}")]
      remarque: [null, Validators.compose([Validators.required])],
      dosage: [null]
    });
  }

  // add a contact form group
  addContact() {
    this.contactList.push(this.createContact());
  }

  // remove contact from group
  removeContact(index) {
    // this.contactList = this.form.get('contacts') as FormArray;
    this.contactList.removeAt(index);
  }



  // get the formgroup under contacts form array
  getContactsFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.contactList.controls[index] as FormGroup;
    return formGroup;
  }

  // method triggered when form is submitted
  submit() {
    console.log(this.form.value);
    const formValue = this.form.value;
    this.prescription = new Prescription();
    this.prescription.patient = this.patient;
    this.prescription.medecin = formValue['doctorPresc'];
    this.prescription.service = formValue['servicePresc'];
    this.prescription.secretaire = this.ownerAccount;
    this.prescription.type_presc = "MDCL";
    this.prescription.type = "MDCL";

    this.prescService.addPrescription(this.prescription)
      .subscribe(data => {
        this.prescriptionSaved = data;
        this.listTraitement = formValue['contacts'];

        for (let index = 0; index < this.listTraitement.length; index++) {
          this.traitement = new Traitement();
          let trai = this.listTraitement[index];
          this.traitement.nom_traitement = trai.medicament;
          this.traitement.voix = trai.voix;
          this.traitement.rythme = trai.rythme;
          this.traitement.remarque = trai.remarque;
          this.traitement.dosage = trai.dosage;
          this.traitement.prescription = this.prescriptionSaved;
          // console.log("traitement" + this.traitement)
          this.saveTraitment(this.traitement);


        }
        this.infoBox("La prescription a été ajouté avec succès");
        //===>rediriger vers détaille
        this.router.navigate(["/detailMedicalPrescription", this.prescriptionSaved.id]);

      }, err => {
        this.infoBox("Desolé! prescription n'a pas été ajouté");
        //this.router.navigate(["/patients"]);

      })


  }

  infoBox(message: string) {

    if (confirm(message)) {

    }
  }


  saveTraitment(traitement: Traitement) {
    this.prescService.addTraitement(traitement)
      .subscribe(data => {

      }, err => {

        console.log(err)
      })
  }


  editPatient(id: number) {
    this.router.navigate(["/editPatient", id]);
  }




}
