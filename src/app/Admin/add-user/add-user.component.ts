import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DepartementService } from 'src/app/service/departement.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],

})
export class AddUserComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  myForm: FormGroup;
  services: any;
  userSaved: User;


  constructor(private router: Router, private depService: DepartementService, private userService: UtilisateurService, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.initForm();
    this.getServices();



  }
  selected = [

  ];

  getServices() {
    this.depService.getServices()
      .subscribe(data => {
        this.services = data;

        console.log(this.services)


      }, err => {

        console.log(err)
      })
  }


  initForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateNaissance: ['', Validators.required],
      role: ['', Validators.required],
      adress: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern("[0-9 ]{11}")]],
      //photo: ['', Validators.required],
      sexe: ['', Validators.required],
      //city: ['', Validators.required],
      selected: ['', Validators.required]



    });
  }


  onSubmitForm() {
    const formValue = this.userForm.value;

    this.user = new User();
    this.user.nom = formValue['lastName'];
    this.user.prenom = formValue['firstName'];
    this.user.email = formValue['email'];
    this.user.date_naissance = formValue['dateNaissance'];
    this.user.role = formValue['role'];
    // this.user.type_user = formValue['role'];
    this.user.telephone = formValue['telephone'];
    //this.user.photo = formValue['photo'];
    this.user.sexe = formValue['sexe'];
    this.user.adress = formValue['adress'];
    console.log("les service selectionner" + formValue['selected'])
    this.selected = formValue['selected'];

    if (formValue['role'] == "admin") this.user.type_user = "ADM";
    else if (formValue['role'] == "medecin") this.user.type_user = "MED";
    else if (formValue['role'] == "secretaire") this.user.type_user = "SCR";
    else if (formValue['role'] == "infirmier") this.user.type_user = "INF";

    this.userService.addUser(this.user)
      .subscribe(data => {
        //this.user = data;

        this.infoBox("L'utilisateur a était ajouté avec succes");
        this.findUserSaved(this.user.email)
      }, err => {
        this.infoBox("Desolé! utilisateur n'a pas était ajouté, vérifier s'il est nouveau ");

      })





  }


  infoBox(message: string) {

    if (confirm(message)) {
      this.router.navigate(["/users"]);
    }
  }

  affectUserToService(idU: number, idS: number) {
    this.depService.AffectUserToService(idU, idS)
      .subscribe(data => {
        console.log("affecteeeeee")
      }, err => {

        console.log(err)
      })

  }

  findUserSaved(email: string) {

    this.userService.searchUserByEmail(email)
      .subscribe(data => {


        this.userSaved = data;
        console.log("user saved" + this.userSaved)
        for (let index = 0; index < this.selected.length; index++) {
          let service = this.selected[index];
          console.log("id service" + service.id)
          console.log("l'objet service" + service)
          this.affectUserToService(this.userSaved.id, service.id)

        }



      }, err => {

        console.log(err)
      })
  }

}
