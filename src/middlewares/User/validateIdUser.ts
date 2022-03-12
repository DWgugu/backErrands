import express from "express";
import users from "../../index";

function validateIdUser(request: express.Request, response: express.Response, next: express.NextFunction) {
    const { userid } = request.params;
    const searchId = users.find(user => user.id === userid);
    if(!searchId) {
        return response.status(404).json({
            message: "Usuário não encontrado"
        });
    };
    next();
};
export default validateIdUser;
