"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../index"));
function validateIdUser(request, response, next) {
    const { userid } = request.params;
    const searchId = index_1.default.find(user => user.id === userid);
    if (!searchId) {
        return response.status(404).json({
            message: "Usuário não encontrado"
        });
    }
    ;
    next();
}
;
exports.default = validateIdUser;
