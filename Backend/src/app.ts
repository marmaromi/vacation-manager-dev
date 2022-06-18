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
import socketLogic from "./5-logic/socket-logic";


const expressServer = express();

expressServer.use(cors({ origin: "*" }));
expressServer.use(express.json());
expressServer.use(expressFileUpload());

// expressServer.use(logRequest);
expressServer.use("/api", usersController);
expressServer.use("/api", vacationsController);

// Send back index.html which must exists in "7-frontend" folder when surfing to root address (https://www.mysite.com):
expressServer.use(express.static(path.join(__dirname, "./7-frontend")));

// If user surf to some unknown page (https://www.mysite.com/nopagehere) return also index so 404 will be presented by react:
expressServer.use("*", (req: Request, res: Response, next: NextFunction) => {
    if (config.isDevelopment) {
        const error = new RouteNotFoundError(req.method, req.originalUrl);        
        next(error);
    }
    else {
        response.sendFile(path.join(__dirname, "./7-frontend/index.html"));
    }
});

expressServer.use(catchAll);

const httpServer = expressServer.listen(config.port, () => console.log("Listening..."));

socketLogic.init(httpServer); 
