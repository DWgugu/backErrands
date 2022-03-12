"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validatePassword(request, response, next) {
    const { password } = request.body;
    if (password === "") {
        return response.status(500).json({
            message: "Senha é um campo obrigatório"
        });
    }
    if (password.length < 8) {
        return response.status(500).json({
            message: "Senha deve conter no mínimo 8 caracteres"
        });
    }
    ;
    next();
}
;
exports.default = validatePassword;
