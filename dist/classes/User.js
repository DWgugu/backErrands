"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let indice = 1;
class User {
    constructor(user, password) {
        this.user = user;
        this.password = password;
        this.id = Math.random().toString(32).substring(2);
        this.errands = [];
        this.id;
    }
}
exports.default = User;
;
