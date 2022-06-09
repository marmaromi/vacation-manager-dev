import { NextFunction, Request, Response } from "express";

async function catchAll(error: any, request: Request, response: Response, next: NextFunction) {

    const status = error.status || 500;
    const message = error.message || "Unknown Error";

    if(status === 500) {
        // Log error to log file
    }

    response.status(status).send(message);

}

export default catchAll;