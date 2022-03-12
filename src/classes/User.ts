import Errands from "./Errands";
let indice = 1;
export default class User {
    id = Math.random().toString(32).substring(2);
    errands: Errands[] = [];

    constructor(
        public user: string,
        public password: string
    ) {
        this.id;
    }
};