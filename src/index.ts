import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import User from "./classes/User";
import validateIdUser from "./middlewares/User/validateIdUser";
import validateUser from "./middlewares/User/validateUser";
import validatePassword from "./middlewares/User/validatePassword";
import Errands from "./classes/Errands";
import validateIdErrands from "./middlewares/Errands/validateErrandsId";
import validateErrands from "./middlewares/Errands/validateErrands";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


const users: User[] = [];

app.post("/users",[validateUser, validatePassword], (request: Request, response: Response) => {
    const { user, password } = request.body;

    const newUser = new User(user, password);
    users.push(newUser);
    return response.status(201).json(newUser);
});

app.get("/users", (request: Request, response: Response) => {
    return response.status(200).json(users);
});

app.get("/user/:userid", [validateIdUser], (request: Request, response: Response) => {
    const { userid } = request.params;

    const searchId = users.findIndex(user => user.id === userid );
    return response.status(200).json(users[searchId]);
});

app.post("/user/:userid/errand", [validateIdUser, validateErrands], (request: Request, response: Response) => {
    const { userid } = request.params;
    const { title, description } = request.body;

    const searchIdUser = users.findIndex(user => user.id === userid );
    const newErrand = new Errands(title, description);
    users[searchIdUser].errands.push(newErrand);
    return response.status(201).json(newErrand);
});

app.get("/user/:userid/errands", [validateIdUser], (request: Request, response: Response) => {
    const { userid } = request.params;
    
    const searchIdUser = users.findIndex(user => user.id === userid );
    return response.status(200).json(users[searchIdUser].errands);
});

app.get("/user/:userid/errand/:id", [validateIdUser], (request: Request, response: Response) => {
    const { userid, id } = request.params;

    const searchIdUser = users.findIndex(user => user.id === userid );
    const searchIdErrand = users[searchIdUser].errands.findIndex(errand => errand.id === parseInt(id));
    return response.status(200).json(users[searchIdUser].errands[searchIdErrand]);
});

app.put("/user/:userid/errand/:id", [validateIdUser], (request: Request, response: Response) => {
    const { userid, id } = request.params;
    const { title, description } = request.body;

    const searchIdUser = users.findIndex(user => user.id === userid );
    const searchIdErrand = users[searchIdUser].errands.findIndex(errand => errand.id === parseInt(id));
    users[searchIdUser].errands[searchIdErrand].title = title;
    users[searchIdUser].errands[searchIdErrand].description = description;
    return response.status(200).json(users[searchIdUser].errands[searchIdErrand]);

});

app.delete("/user/:userid/errand/:id", [validateIdUser], (request: Request, response: Response) => {
    const { userid, id } = request.params;

    const searchIdUser = users.findIndex(user => user.id === userid );
    const userErrand = users[searchIdUser].errands;
    const searchIdErrand = userErrand.findIndex((errand: any) => errand.id == id);
    //const searchIdErrand = users[searchIdUser].errands.findIndex(errand => errand.id === id);
    userErrand.splice(searchIdErrand, 1);
    return response.status(200).json({
        message: "Recado deletado com sucesso"
    });
});

const port = process.env.PORT || 8080;

app.listen(port, ()=> {
    console.log("Servidor Rodando");    
});

export default users;