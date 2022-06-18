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


export default router;