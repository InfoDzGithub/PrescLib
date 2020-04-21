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
  user: any;
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
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private depService: DepartementService, private router: Router, private userService: UtilisateurService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.searchUserById(this.id)
      .subscribe(data => this.user = data);
    this.initForm();
    this.getServices();
    this.getServicesOccupied();


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
      email: ['', [Validators.required, Validators.email]],
      dateNaissance: ['', Validators.required],
      role: ['', Validators.required],
      adress: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern("[0-9 ]{11}")]],

      sexe: ['', Validators.required]



    });
  }

  onSubmitForm() { }

  /*getServicesOccupied() {
    this.userService.servicesOccupiedByUser(this.id, this.curentPage, this.size)
      .subscribe(data => {
        this.service_user = data;
        this.totalElement = this.service_user.numberOfElements;
        this.pages = new Array(this.service_user.totalPages)
        this.selected = [];
        for (let i = 0; i < this.totalElement; i++) {

          if (this.service_user.content[i].etat == true) {
            this.selected.push(this.service_user.content[i]);
            console.log("s" + this.selected)


          }



        }



      }, err => {

        console.log(err)
      })
  }*/

  /*gotoPage(i: number) {
    this.curentPage = i;
    this.getServicesOccupied();
    /* this.userService.servicesOccupiedByUser(this.id, this.curentPage, this.size)
       .subscribe(data => {
         this.service_user = data;
         this.totalElement = this.service_user.totalElements;
         this.pages = new Array(this.service_user.totalPages)
         //this.selected = [];
         for (let i = 0; i < this.totalElement; i++) {
 
           if (this.service_user.content[i].etat == true) {
             this.selected.push(this.service_user.content[i]);
             console.log("s" + this.selected)
 
 
           }
 
 
 
         }
 
       }, err => {
 
         console.log(err)
       })
  }*/

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


