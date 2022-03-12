import express from "express";
import users from "../../index";

function validatePassword(request: express.Request, response: express.Response, next: express.NextFunction) {
    const { password } = request.body;
    if(password === "") {
        return response.status(500).json({
            message: "Senha é um campo obrigatório"
        });
    }
    if(password.length < 8) {
        return response.status(500).json({
            message: "Senha deve conter no mínimo 8 caracteres"
        });
    };
    next();
};
export default validatePassword;