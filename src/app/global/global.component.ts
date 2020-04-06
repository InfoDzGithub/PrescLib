import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UtilisateurService } from '../service/utilisateur.service';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  //template: ' <app-header [id]="id"></app-header>',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {
  id: number;
  message: number;
  email: string;
  constructor(private route: ActivatedRoute,
    private router: Router, private userService: UtilisateurService) { }



  ngOnInit() {
    //this.id = +this.route.snapshot.params['id'];
    //this.authService.currentMessage.subscribe(message => this.message = message)
    this.email = sessionStorage.getItem('email');
  }

}
