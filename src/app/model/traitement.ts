import { Contenu } from './contenu';

export class Traitement extends Contenu {

    nom_traitement: string;
    remarque: string;
    voix: string;
    rythme: number;
    dosage: number;
    constructor() {
        super();
    }
}
