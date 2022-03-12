import express from "express";
import users from "../../index";

function validateIdErrands(request: express.Request, response: express.Response, next: express.NextFunction) {
    const { userid, id } = request.params;
    const searchIdUser = users.findIndex(user => user.id === userid );
    const searchIdErrand = users[searchIdUser].errands.findIndex(errand => errand.id === parseInt(id));
    
    if(!searchIdErrand) {
        return response.status(404).json({
            message: "Recado não encontrado."
        })
    };
    next();
};
export default validateIdErrands;