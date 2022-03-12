"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../index"));
function validateUser(request, response, next) {
    const { user } = request.body;
    if (index_1.default.find(searchUser => searchUser.user === user)) {
        return response.status(500).json({
            message: "Usuário ja existe"
        });
    }
    ;
    if (user === "") {
        return response.status(500).json({
            message: "Usuário é um campo obrigatório"
        });
    }
    if (user.length < 3) {
        return response.status(500).json({
            message: "Senha deve conter no mínimo 3 caracteres"
        });
    }
    ;
    next();
}
;
exports.default = validateUser;
