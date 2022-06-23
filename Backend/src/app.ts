import express, { NextFunction, Request, Response } from "express";
import expressRateLimit from "express-rate-limit";
import cors from 'cors';
import sanitize from "./3-middleware/sanitize";
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

expressServer.use("/api/", expressRateLimit({
    windowMs: 100, // millisecond window time
    max: 10, // Maximum requests per window time
    message: "User exceeded maximum request limit" // Message to return on rate limit
}));

expressServer.use(express.json());
expressServer.use(expressFileUpload());

expressServer.use(sanitize);

// expressServer.use(logRequest);
expressServer.use("/api", usersController);
expressServer.use("/api", vacationsController);

expressServer.use(express.static(path.join(__dirname, "./7-frontend")));// Send back index.html which must exists in "7-frontend" folder when surfing to root address (https://www.mysite.com)
expressServer.use("*", (req: Request, res: Response, next: NextFunction) => {// If user surf to some unknown page (https://www.mysite.com/nopagehere) return also index so 404 will be presented by react:
    if (config.isProduction) {
        res.sendFile(path.join(__dirname, "./7-frontend/index.html"));
    }
    else {
        const error = new RouteNotFoundError(req.method, req.originalUrl);
        next(error);
    }
});

expressServer.use(catchAll);

const httpServer = expressServer.listen(config.port, () => console.log("Listening..."));

socketLogic.init(httpServer); 
