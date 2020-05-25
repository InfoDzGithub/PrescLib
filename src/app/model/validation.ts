import { User } from './user';
import { FicheInfirmier } from './fiche-infirmier';
import { Contenu } from './contenu';

export class Validation {
    id: number;
    dateV: Date;
    timeValidation: Date;
    infirmier: User;
    ficheInfirmier: FicheInfirmier;
    contenu: Contenu;
    val_num: number;
    val_bool: Boolean;
    type_val: string;


    constructor() { }
}
