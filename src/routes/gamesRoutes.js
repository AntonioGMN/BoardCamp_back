import { Router } from "express";
import { getGames, postGames } from "../controles/gamesControles.js";
import validateGame from "../middlewares/valideteGames.js";

const gameRouter = Router();
gameRouter.get("/games", getGames);
gameRouter.post("/games", validateGame, postGames);

export default gameRouter;
