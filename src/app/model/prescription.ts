import { User } from './user';
import { Service } from './service';
import { Patient } from './patient';
import { Contenu } from './contenu';

export class Prescription {
    id: number;
    etat: boolean;
    patient: Patient;
    service: Service;
    medecin: User;
    secretaire: User;
    type_aliment: string;
    type_presc: string;
    dateP: Date;
    type: string;
    contenu: Contenu[];

    constructor() { }
}
