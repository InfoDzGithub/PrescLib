import { Service } from './service';
import { DecimalPipe } from '@angular/common';

export class Patient {

    id: number;
    cni: number;
    profession: string;
    nom: string;
    prenom: string;
    adress: string;
    date_naissance: Date;
    sexe: string;
    telephone: string;
    group_sanguin: string;
    etat: boolean;
    service: Service;


    constructor() { }
}
