import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

async function verifyLogIn(request: Request, response: Response, next: NextFunction) {

    try {
        await cyber.verifyToken(request);
        next();
    } catch (error) {
        next(error);
    }

}

export default verifyLogIn;