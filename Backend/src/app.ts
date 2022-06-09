import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import catchAll from "./3-middleware/catch-all";
// import logRequest from "./3-middleware/log-request";
import { RouteNotFoundError } from "./4-models/errors-model";
import usersController from "./6-controllers/users-controller";
import vacationsController from "./6-controllers/vacations-controller";
import expressFileUpload from "express-fileupload";


const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload());


// server.use(logRequest);


server.use("/api", usersController);
server.use("/api", vacationsController);


server.use("*", (req: Request, res: Response, next: NextFunction) => {
    const error = new RouteNotFoundError(req.method, req.originalUrl);
    next(error);
});

server.use(catchAll);

server.listen(3002, () => console.log("Listening..."));