import express, { NextFunction, Request, response, Response } from "express";
import cors from 'cors';
import catchAll from "./3-middleware/catch-all";
// import logRequest from "./3-middleware/log-request";
import { RouteNotFoundError } from "./4-models/errors-model";
import usersController from "./6-controllers/users-controller";
import vacationsController from "./6-controllers/vacations-controller";
import expressFileUpload from "express-fileupload";
import config from "./2-utils/config";
import path from "path";


const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload());


// server.use(logRequest);


server.use("/api", usersController);
server.use("/api", vacationsController);

if (config.isDevelopment) {
    server.use("*", (req: Request, res: Response, next: NextFunction) => {
        const error = new RouteNotFoundError(req.method, req.originalUrl);
        next(error);
    });
}
else {
    response.sendFile(path.join(__dirname, "./7-frontend/index.html"));
}

server.use(catchAll);

server.listen(config.port, () => console.log("Listening..."));