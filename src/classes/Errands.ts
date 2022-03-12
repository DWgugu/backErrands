let indice = 1;
export default class Errands {
    id = indice++;

    constructor (
        public title: string,
        public description: string
    ) {
        this.id;
    }
};