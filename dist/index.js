"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const User_1 = __importDefault(require("./classes/User"));
const validateIdUser_1 = __importDefault(require("./middlewares/User/validateIdUser"));
const validateUser_1 = __importDefault(require("./middlewares/User/validateUser"));
const validatePassword_1 = __importDefault(require("./middlewares/User/validatePassword"));
const Errands_1 = __importDefault(require("./classes/Errands"));
const validateErrands_1 = __importDefault(require("./middlewares/Errands/validateErrands"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
const users = [];
app.post("/users", [validateUser_1.default, validatePassword_1.default], (request, response) => {
    const { user, password } = request.body;
    const newUser = new User_1.default(user, password);
    users.push(newUser);
    return response.status(201).json(newUser);
});
app.get("/users", (request, response) => {
    return response.status(200).json(users);
});
app.get("/user/:userid", [validateIdUser_1.default], (request, response) => {
    const { userid } = request.params;
    const searchId = users.findIndex(user => user.id === userid);
    return response.status(200).json(users[searchId]);
});
app.post("/user/:userid/errand", [validateIdUser_1.default, validateErrands_1.default], (request, response) => {
    const { userid } = request.params;
    const { title, description } = request.body;
    const searchIdUser = users.findIndex(user => user.id === userid);
    const newErrand = new Errands_1.default(title, description);
    users[searchIdUser].errands.push(newErrand);
    return response.status(201).json(newErrand);
});
app.get("/user/:userid/errands", [validateIdUser_1.default], (request, response) => {
    const { userid } = request.params;
    const searchIdUser = users.findIndex(user => user.id === userid);
    return response.status(200).json(users[searchIdUser].errands);
});
app.get("/user/:userid/errand/:id", [validateIdUser_1.default], (request, response) => {
    const { userid, id } = request.params;
    const searchIdUser = users.findIndex(user => user.id === userid);
    const searchIdErrand = users[searchIdUser].errands.findIndex(errand => errand.id === parseInt(id));
    return response.status(200).json(users[searchIdUser].errands[searchIdErrand]);
});
app.put("/user/:userid/errand/:id", [validateIdUser_1.default], (request, response) => {
    const { userid, id } = request.params;
    const { title, description } = request.body;
    const searchIdUser = users.findIndex(user => user.id === userid);
    const searchIdErrand = users[searchIdUser].errands.findIndex(errand => errand.id === parseInt(id));
    users[searchIdUser].errands[searchIdErrand].title = title;
    users[searchIdUser].errands[searchIdErrand].description = description;
    return response.status(200).json(users[searchIdUser].errands[searchIdErrand]);
});
app.delete("/user/:userid/errand/:id", [validateIdUser_1.default], (request, response) => {
    const { userid, id } = request.params;
    const searchIdUser = users.findIndex(user => user.id === userid);
    const userErrand = users[searchIdUser].errands;
    const searchIdErrand = userErrand.findIndex((errand) => errand.id == id);
    //const searchIdErrand = users[searchIdUser].errands.findIndex(errand => errand.id === id);
    userErrand.splice(searchIdErrand, 1);
    return response.status(200).json({
        message: "Recado deletado com sucesso"
    });
});
const port = process.env.PORT || 8080;
app.listen(8080, () => {
    console.log("Servidor Rodando");
});
exports.default = users;
