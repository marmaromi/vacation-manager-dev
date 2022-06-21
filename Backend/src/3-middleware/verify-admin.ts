import { NextFunction, Request, Response } from "express";
import cyberToken from "../2-utils/cyber-token";
import { ForbiddenError } from "../4-models/errors-model";
import Role from "../4-models/role-model";

async function verifyAdmin(req: Request, res: Response, next: NextFunction) {

    try {         
        await cyberToken.verifyToken(req);
        
        const role = cyberToken.getTokenRole(req);
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