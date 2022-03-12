import express from "express";

function validateErrands(request: express.Request, response: express.Response, next: express.NextFunction) {
    const { title, description } = request.body;

    if(title === "" || description === "") {
        return response.status(500).json({
            message: "Título ou Descrição não pode estar vazio."
        })
    };
    next();
}
export default validateErrands;