import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../4-models/credentials-model";
import UserModel from "../4-models/user-model";
import usersLogic from "../5-logic/users-logic";


const router = express.Router();

router.post("/users/register", async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = new UserModel(req.body)
        const token = await usersLogic.register(user);
        res.status(201).json(token);

    } catch (error) {
        next(error);
    }
});

router.post("/users/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(req.body)
        const token = await usersLogic.login(credentials);
        res.json(token);

    } catch (error) {
        next(error);
    }
});

router.get("/users/following/:userId([0-9]+)", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = +req.params.userId;

        const followedVacations = await usersLogic.vacationsUserFollows(userId);
        res.json(followedVacations);

    } catch (error) {
        next(error);
    }
});

router.post("/users/following/:userId([0-9]+)/:vacationId([0-9]+)", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = +req.params.userId;
        const vacationId = +req.params.vacationId;

        await usersLogic.userFollowsVacation(userId, vacationId);
        const followedVacations = await usersLogic.vacationsUserFollows(userId);
        res.json(followedVacations);

    } catch (error) {
        next(error);
    }
});

router.delete("/users/following/:userId([0-9]+)/:vacationId([0-9]+)", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = +req.params.userId;
        const vacationId = +req.params.vacationId;
        await usersLogic.userUnFollowsVacation(userId, vacationId);
        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
});


export default router;