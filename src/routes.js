const { Router } = require('express');

const UserController = require('./app/Controllers/UserController');

const routes = new Router();

//routes.post("/user", UserController.index);
routes.post("/user", UserController.store);
routes.get("/user", UserController.show);
routes.get("/userr", UserController.showr);


module.exports = routes;