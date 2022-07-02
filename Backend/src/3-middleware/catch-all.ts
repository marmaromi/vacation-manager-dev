import { NextFunction, Request, Response } from "express";
import config from "../2-utils/config";

async function catchAll(error: any, req: Request, res: Response, next: NextFunction) {
    console.log(error);
    
    let status: any;
    let message: string;

    if (!config.isProduction) {
        status = error.status || 500;
        message = error.message || "Unknown Error";
        if (status === 500) {
            // Log error to log file    
        }
    }

    res.status(status).send(message);

}

export default catchAll;