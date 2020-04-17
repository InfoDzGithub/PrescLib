import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthentificationService } from '../service/authentification.service'; import { UtilisateurService } from '../service/utilisateur.service';
import { Router } from '@angular/router';
import { DepartementService } from '../service/departement.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  items: any;

  constructor(private fb: FormBuilder, private depService: DepartementService, private router: Router, private userService: UtilisateurService) { }

  ngOnInit() {
    this.userService.getUsers("", 0, 5)
      .subscribe(data => {
        this.items = data;

        console.log(this.items)


      }, err => {

        console.log(err)
      })

  }


  /*items = [
    { id: 1, name: 'Python' },
    { id: 2, name: 'Node Js' },
    { id: 3, name: 'Java' },
    { id: 4, name: 'PHP', disabled: true },
    { id: 5, name: 'Django' },
    { id: 6, name: 'Angular' },
    { id: 7, name: 'Vue' },
    { id: 8, name: 'ReactJs' },
  ];*/
  selected = [
    /*{ id: 2, name: 'Node Js' },
    { id: 8, name: 'ReactJs' }*/
  ];
  //}

}