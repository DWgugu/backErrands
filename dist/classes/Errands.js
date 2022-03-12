"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let indice = 1;
class Errands {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.id = indice++;
        this.id;
    }
}
exports.default = Errands;
;
