import { NextFunction, Request, Response } from "express";

async function catchAll(error: any, req: Request, res: Response, next: NextFunction) {

    const status = error.status || 500;
    const message = error.message || "Unknown Error";

    if(status === 500) {
        // Log error to log file        
    }

    res.status(status).send(message);

}

export default catchAll;