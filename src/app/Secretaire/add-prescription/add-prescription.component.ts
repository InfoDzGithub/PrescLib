import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartementService } from 'src/app/service/departement.service';
import { PatientService } from 'src/app/service/patient.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { Patient } from 'src/app/model/patient';
import { ActivatedRoute } from '@angular/router';

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
  ownerAccount: any;
  email: string;
  patient: Patient;
  id: number;

  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get('contacts') as FormArray;
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private depService: DepartementService, private patService: PatientService, private userService: UtilisateurService) { }

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
      rythme: [null, [Validators.pattern("[0-9 ]{1}")]], // i.e. Home, Office
      remarque: [null, Validators.compose([Validators.required])]
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
  }

}
