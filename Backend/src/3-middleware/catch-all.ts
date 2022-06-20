import { NextFunction, Request, Response } from "express";
import config from "../2-utils/config";

async function catchAll(error: any, req: Request, res: Response, next: NextFunction) {
    console.log(error);

    
    let status: any;
    let message: string;

    if (config.isDevelopment) {
        status = error.status || 500;
        message = error.message || "Unknown Error";
        if (status === 500) {
            // Log error to log file    
            // console.log(status);
        }
    } else {
        status = 500;
        message = "Server Error";
        console.log(status, message);
    }



    res.status(status).send(message);

}

export default catchAll;