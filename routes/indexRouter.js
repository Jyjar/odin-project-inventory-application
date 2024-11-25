const { Router } = require("express");
const indexRouter = Router();
const pokédexController = require("../controllers/pokédexController");

indexRouter.get("/", pokédexController.getPokémons);

module.exports = indexRouter;