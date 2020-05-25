import { Patient } from './patient';
import { Service } from './service';
import { Prescription } from './prescription';

export class FicheInfirmier {

    id: number;
    etat: boolean;
    patient: Patient;
    service: Service;
    prescription: Prescription;
    type_fiche: string;
    dateF: Date;
    num_chambre: number;


    constructor() { }
}
