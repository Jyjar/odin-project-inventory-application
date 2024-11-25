const { Router } = require("express");
const indexRouter = Router();
const pokédexController = require("../controllers/pokédexController");

indexRouter.get("/", pokédexController.getPokémons);
indexRouter.get("/add-pokemon", pokédexController.addPokémonGet);
indexRouter.post("/add-pokemon", pokédexController.addPokémonPost)

module.exports = indexRouter;