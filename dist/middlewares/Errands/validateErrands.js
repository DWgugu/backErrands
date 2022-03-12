"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateErrands(request, response, next) {
    const { title, description } = request.body;
    if (title === "" || description === "") {
        return response.status(500).json({
            message: "Título ou Descrição não pode estar vazio."
        });
    }
    ;
    next();
}
exports.default = validateErrands;
