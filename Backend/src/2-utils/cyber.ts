import { Request } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../4-models/errors-model";
import Role from "../4-models/role-model";
import UserModel from "../4-models/user-model";


const secret = 'vacations for users';

const getNewToken = (user: UserModel): string => {

    const payload = { user };
    const token = jwt.sign(payload, secret);
    return token
}

const verifyToken = (req: Request): Promise<boolean> => {

    return new Promise<boolean>((resolve, reject) => {
        const header = req.headers.authorization;
        if (!header) {
            reject(new UnauthorizedError("No token sent"));
            return;
        }

        const token = header.substring(7);

        if (!token) {
            reject(new UnauthorizedError("No token sent"));
            return;
        }

        jwt.verify(token, secret, (error, payload) => {
            if (error) {
                reject(new UnauthorizedError("Invalid or expired token"));
                return;
            }
            resolve(true);
        });

    });
}

const getTokenRole = (request: Request): Role => {
    
    const header = request.headers.authorization;
    const token = header.substring(7);
    const payload = jwt.decode(token);
    const user = (payload as any).user;
    // console.log(header);
    
    return user.privileges;
}


export default {
    getNewToken,
    verifyToken,
    getTokenRole
}