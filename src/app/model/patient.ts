import { Service } from './service';

export class Patient {

    id: number;
    CNI: number;
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
