import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";
import UserModel from "../4-models/user-model";
import cyberToken from "../2-utils/cyber-token"
import hash from "../2-utils/cyber-hash";
import CredentialsModel from "../4-models/credentials-model";


const register = async (user: UserModel): Promise<string> => {

    const errors = user.validatePost();
    if (errors) {
        throw new ValidationError(errors);
    }

    if (await usernameExists(user.username)) {
        throw new ValidationError(`username ${user.username} already exists`);
    }

    user.password = hash(user.password);

    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?,'user')`;
    const values = [user.firstName, user.lastName, user.username, user.password];

    const result: OkPacket = await dal.execute(sql, values);
    user.id = result.insertId;

    user.followedVacations = await vacationsUserFollows(user.id);

    const token = cyberToken.getNewToken(user);

    return token;
}

const login = async (credentials: CredentialsModel): Promise<string> => {

    credentials.username = credentials.username.toLocaleLowerCase();
    credentials.password = hash(credentials.password);

    const sql = `SELECT userId as id, username, privileges, password, firstName, lastName FROM users WHERE username = '${credentials.username}' AND password = '${credentials.password}'`
    const users = await dal.execute(sql);
    const user: UserModel = users[0];

    if (!user) {
        throw new ValidationError(`Incorrect username or password`);
    }

    user.followedVacations = await vacationsUserFollows(user.id);
    delete user.password;
    delete user.id;

    const token = cyberToken.getNewToken(user);

    return token;
}

const usernameExists = async (username: string): Promise<boolean> => {
    const sql = `SELECT EXISTS(SELECT username FROM users WHERE username = '${username}') AS isExists`;
    const result: OkPacket = await dal.execute(sql);
    const exists = result[0].isExists;
    return exists;
}

const vacationsUserFollows = async (userId: number): Promise<number[]> => {
    // UPDATE vacations SET followers = (SELECT COUNT(vacationId) as followers FROM user_tagged_vacations WHERE vacations.vacationId = user_tagged_vacations.vacationId);

    const sql = `SELECT vacationId FROM user_tagged_vacations WHERE userId = ${userId}`;

    const result = await dal.execute(sql);

    const vacationsUserFollows = result.map((r: any) => r.vacationId);
    return vacationsUserFollows;
}

const userFollowsVacation = async (userId: number, vacationId: number): Promise<void> => {

    const followedVacations = await vacationsUserFollows(userId);

    if (followedVacations.includes(vacationId)) {
        throw new ResourceNotFoundError(userId);
    }

    const sql = `INSERT INTO user_tagged_vacations VALUES(?, ?)`;
    const values = [userId, vacationId]

    await dal.execute(sql, values);
}

const userUnFollowsVacation = async (userId: number, vacationId: number): Promise<void> => {
    const sql = `DELETE FROM user_tagged_vacations WHERE userId = ${userId} AND vacationId = ${vacationId}`
    const result: OkPacket = await dal.execute(sql);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(userId);
    }
}


export default {
    register,
    login,
    vacationsUserFollows,
    userFollowsVacation,
    userUnFollowsVacation,
}

// const getAllUsers = async (): Promise<UserModel[]> => {
//     const sql = `SELECT userId as id,
//                         firstName,
//                         lastName,
//                         username,
//                         password,
//                         privileges
//                  FROM users`;

//     const users = await dal.execute(sql);
//     return users;
// }

// const getOneUser = async (id: number): Promise<UserModel> => {
//     const sql = `SELECT userId as id,
//                         firstName,
//                         lastName,
//                         username,
//                         password,
//                         privileges
//                  FROM users
//                  WHERE userId = ${id}`;

//     const users = await dal.execute(sql);
//     const user = users[0];
//     if (!user) {
//         throw new ResourceNotFoundError(id);
//     }
//     return user;
// }


// const deleteUser = async (id: number): Promise<void> => {
//     const sql = `DELETE FROM users WHERE userId = ${id}`
//     const result: OkPacket = await dal.execute(sql);
//     if (result.affectedRows === 0) {
//         throw new ResourceNotFoundError(id);
//     }
// }