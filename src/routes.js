const { Router } = require('express');

const UserController = require('./app/Controllers/UserController');
const LoginController = require('./app/Controllers/LoginController');

const routes = new Router();

//routes.post("/user", UserController.index);
routes.post("/user", UserController.store);
routes.get("/user", UserController.show);
routes.get("/userr", UserController.showr);

routes.post("/login", LoginController.index);


module.exports = routes;