import express from "express";
import users from "../../index";

function validateUser(request: express.Request, response: express.Response, next: express.NextFunction) {
    const { user } = request.body;
    if(users.find( searchUser => searchUser.user === user) ) {
        return response.status(500).json({
            message: "Usuário ja existe"
        });
    };    
    if(user === "") {
        return response.status(500).json({
             message: "Usuário é um campo obrigatório"
         });
    }
    if(user.length < 3) {
         return response.status(500).json({
             message: "Senha deve conter no mínimo 3 caracteres"
         });
     };        
    next();
};
export default validateUser;