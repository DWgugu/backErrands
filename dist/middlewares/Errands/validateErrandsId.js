"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../index"));
function validateIdErrands(request, response, next) {
    const { userid, id } = request.params;
    const searchIdUser = index_1.default.findIndex(user => user.id === userid);
    const searchIdErrand = index_1.default[searchIdUser].errands.findIndex(errand => errand.id === parseInt(id));
    if (!searchIdErrand) {
        return response.status(404).json({
            message: "Recado não encontrado."
        });
    }
    ;
    next();
}
;
exports.default = validateIdErrands;
