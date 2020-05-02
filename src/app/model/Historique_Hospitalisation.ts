import { Service } from './service';
import { Patient } from './patient';
import { User } from './user';
export class Historique_Hospitalisation {
    id: number;
    patient: Patient;
    service: Service;
    date_entre: Date;
    date_sortie: Date;
    num_chambre: number;
    etat: boolean;
    medecin_traitant: User;
    constructor() { }
}
