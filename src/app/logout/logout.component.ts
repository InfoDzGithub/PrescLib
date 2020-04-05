import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../service/authentification.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private loginService: AuthentificationService) { }

  ngOnInit(): void {
  }

}
