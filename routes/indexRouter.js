const { Router } = require("express");
const indexRouter = Router();
const pokédexController = require("../controllers/pokédexController");

indexRouter.get("/", pokédexController.getPokémons);
indexRouter.get("/add-pokemon", pokédexController.addPokémonGet);
indexRouter.post("/add-pokemon", pokédexController.addPokémonPost);
indexRouter.get("/pokemon/:index", pokédexController.getPokémon);

module.exports = indexRouter;