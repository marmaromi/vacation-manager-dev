import { NextFunction, Request, Response } from "express";
import config from "../2-utils/config";

async function catchAll(error: any, req: Request, res: Response, next: NextFunction) {
    console.log(error);

    let status: any;
    let message: string;

    status = error.status || 500;
    message = error.message || "Unknown Error";


    res.status(status).send(message);

}

export default catchAll;