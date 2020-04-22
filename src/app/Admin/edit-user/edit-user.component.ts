import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { DepartementService } from 'src/app/service/departement.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User;
  id: number;
  acces: any;
  //service_user: any;
  //totalElement: number;
  curentPage: number = 0;
  size: number = 3;
  pages: Array<number>;
  servicesOccupied: any;
  userForm: FormGroup;
  services: any;
  //selected = [];
  email: string;
  ownerAccount: User;
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private depService: DepartementService, private router: Router, private userService: UtilisateurService) { }

  ngOnInit(): void {
    this.user = new User();
    this.id = this.route.snapshot.params['id'];
    this.userService.searchUserById(this.id)
      .subscribe(data => this.user = data);
    this.initForm();
    this.getServices();
    this.getServicesOccupied();

    this.getAccountOwner();




  }

  getAccountOwner() {
    this.email = sessionStorage.getItem('email');
    this.userService.searchUserByEmail(this.email)
      .subscribe(data => this.ownerAccount = data);

  }



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
      sexe: [''],
      role: ['', Validators.required],

      adress: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern("[0-9 ]{11}")]],

      email: ['', [Validators.required, Validators.email]],
      dateNaissance: ['', Validators.required]




    });
  }




  onSubmitForm() {
    const formValue = this.userForm.value;

    this.user.nom = formValue['lastName'];
    this.user.prenom = formValue['firstName'];
    this.user.role = formValue['role'];

    this.user.telephone = formValue['telephone'];
    this.user.adress = formValue['adress'];
    this.user.email = formValue['email'];
    this.user.date_naissance = formValue['dateNaissance'];
    this.user.sexe = formValue['sexe'];


    this.userService.editUser(this.user, this.id)
      .subscribe(data => {
        this.infoBox("L'utilisateur a était modifier avec succes");

      }, err => {
        this.infoBox("Desolé! utilisateur n' a pas était modifier");

      })

  }

  infoBox(message: string) {

    if (confirm(message)) {
      this.router.navigate(["/users"]);
    }
  }


  detailUser(id: number) {

    this.router.navigate(["/detailUser", id]);
  }

  gotoPage(i: number) {
    this.curentPage = i;
    this.getServicesOccupied();

  }

  detachUserFromServiceConfirm(item: any) {
    if (confirm("Cette action va détacher L'utilisateur:  " + this.user.nom + " " + this.user.prenom + " du service " + item.service.nom)) {

      this.userService.releaseUserFromActifService(this.id, item.service.id)
        .subscribe(data => {
          console.log("user bien detaché du service")
          this.getServicesOccupied();

        }, err => {

          console.log(err)
        })



    }

  }

  getServicesOccupied() {
    this.userService.servicesOccupiedByUser(this.id, this.curentPage, this.size)
      .subscribe(data => {

        this.servicesOccupied = data;
        this.pages = new Array(this.servicesOccupied.totalPages)



      }, err => {

        console.log(err)
      })
  }

  onAddNewAcess() {
    for (let index = 0; index < this.acces.length; index++) {
      let service = this.acces[index];
      //console.log("id du service" + service.id)
      //console.log("id du user" + this.id)
      this.affectUserToService(this.id, service.id)

    }

  }
  affectUserToService(idU: number, idS: number) {
    this.depService.AffectUserToService(idU, idS)
      .subscribe(data => {
        this.acces = [];
        this.getServicesOccupied();

      }, err => {

        console.log(err)
      })

  }

}


