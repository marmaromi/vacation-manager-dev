import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { ForbiddenError } from "../4-models/errors-model";
import Role from "../4-models/role-model";

async function verifyAdmin(req: Request, res: Response, next: NextFunction) {

    try {         
        await cyber.verifyToken(req);
        
        const role = cyber.getTokenRole(req);
        if(role !== Role.Admin) {
            const error = new ForbiddenError("You are not an Admin!");
            next(error);
        }
        next();
    }    catch (error) { 
        next(error);
    }

}

export default verifyAdmin;