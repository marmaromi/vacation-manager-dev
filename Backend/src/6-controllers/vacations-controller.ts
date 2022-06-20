import express, { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs"
import VacationModel from "../4-models/vacation-model";
import vacationLogic from "../5-logic/vacation-logic";
import { RouteNotFoundError } from "../4-models/errors-model";
import verifyLogIn from "../3-middleware/verify-log-in";
import verifyAdmin from "../3-middleware/verify-admin";


const router = express.Router();


router.get("/vacations", verifyLogIn, async (req: Request, res: Response, next: NextFunction) => {
    try {

        const vacations = await vacationLogic.getAllVacations();
        res.json(vacations)

    } catch (error) {
        next(error);
    }
});

router.get("/vacations/:id([0-9]+)", verifyLogIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;
        const vacation = await vacationLogic.getOneVacation(id);
        res.json(vacation)

    } catch (error) {
        next(error);
    }
});

router.post("/vacations", verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        req.body.image = req.files?.image;
        const vacation = new VacationModel(req.body)
        const newVacation = await vacationLogic.addVacation(vacation);
        res.status(201).json(newVacation)

    } catch (error) {
        next(error);
    }
});

router.put("/vacations/:id([0-9]+)", verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {        
        req.body.id = +req.params.id;
        req.body.image = req.files?.image;
        const vacation = new VacationModel(req.body);

        const updatedVacation = await vacationLogic.updateVacation(vacation);
        res.json(updatedVacation);
    }
    catch (error) {
        next(error);
    }
});

router.delete("/vacations/:id([0-9]+)", verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;
        await vacationLogic.deleteVacation(id);
        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
});

router.get("/vacations/images/:imageName", verifyLogIn, async (request: Request, response: Response, next: NextFunction) => {
    try {

        const imageName = request.params.imageName;

        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);

        if (!fs.existsSync(absolutePath)) {
            throw new RouteNotFoundError(request.method, request.originalUrl);
        }

        response.sendFile(absolutePath);
    }

    catch (error) {
        next(error);
    }
});


export default router;