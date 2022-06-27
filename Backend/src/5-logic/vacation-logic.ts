import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";
import fs from "fs";
import socketLogic from "./socket-logic";

const getAllVacations = async (): Promise<VacationModel[]> => {
    const sql = `SELECT vacationId as id, 
                        description, 
                        destination, 
                        startDate, 
                        endDate, 
                        price,
                        followers,
                        imageName
                 FROM vacations`;

    const vacations: VacationModel[] = await dal.execute(sql);
    vacations.forEach(async vacation => await UpdateFollowerCount(vacation.id));
    return vacations;
}

const getOneVacation = async (id: number): Promise<VacationModel> => {
    await UpdateFollowerCount(id);
    const sql = `SELECT vacationId as id, 
                        description, 
                        destination, 
                        startDate, 
                        endDate, 
                        price,
                        followers,
                        imageName
                 FROM vacations
                 WHERE vacationId = ${id}`;

    const vacations = await dal.execute(sql);
    const vacation = vacations[0];
    if (!vacation) {
        throw new ResourceNotFoundError(id);
    }
    return vacation;
}

const addVacation = async (vacation: VacationModel): Promise<VacationModel> => {

    const errors = vacation.validatePost();
    if (errors) {
        throw new ValidationError(errors);
    }

    if (vacation.image) {

        const dotIndex = vacation.image.name.lastIndexOf(".");
        const extension = vacation.image.name.substring(dotIndex);
        vacation.imageName = uuid() + extension;


        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);

        delete vacation.image;
    }

    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, 0)`;

    const values = [vacation.description, vacation.destination, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName]

    const result: OkPacket = await dal.execute(sql, values);
    vacation.id = result.insertId;

    socketLogic.reportAddVacation(vacation);
    return vacation;
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    
    const errors = vacation.validatePut();
    if (errors) {
        throw new ValidationError(errors);
    }

    const vacationToUpdate = await getOneVacation(vacation.id);

    if (vacation.image) {
        const imageToDelete = "./src/1-assets/images/" + vacationToUpdate.imageName;
        await fs.unlink(imageToDelete, (err) => {
            if (err) {
                console.log(`Image to delete not found in path: "${imageToDelete}"`);
            }
            else console.log(`File was deleted in path: "${imageToDelete}"`);
        });

        const dotIndex = vacation.image.name.lastIndexOf(".");
        const extension = vacation.image.name.substring(dotIndex);
        vacation.imageName = uuid() + extension;

        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);

        delete vacation.image;
    }
    else if (!vacationToUpdate.image) {
        vacation.image = vacationToUpdate.image
        vacation.imageName = vacationToUpdate.imageName
    }

    vacation.followers = await followerCount(vacation.id);

    const sql = `UPDATE vacations 
                 SET description = '${vacation.description}',
                     destination = '${vacation.destination}',
                     startDate = '${vacation.startDate}',
                     endDate = '${vacation.endDate}',
                     price = ${vacation.price},
                     imageName = '${vacation.imageName}',
                     followers = ${vacation.followers}
                 WHERE vacationId = ${vacation.id}`;
    // const sql = `UPDATE vacations 
    //              SET description = ?, destination = ?, startDate = ?, endDate = ?, price = ?, imageName = ?, followers = ?
    //              WHERE vacationId = ${vacation.id}`;

    const values = [vacation.description, vacation.destination, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.followers]

    const result: OkPacket = await dal.execute(sql);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(vacation.id);
    }
    
    socketLogic.reportUpdateVacation(vacation);
    return vacation;
}

const deleteVacation = async (id: number): Promise<void> => {
    const sql = `DELETE FROM vacations WHERE vacationId = ${id}`
    const result: OkPacket = await dal.execute(sql);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(id);
    }

    const vacationToDelete: VacationModel = await getOneVacation(id);
    const imageToDelete = "./src/1-assets/images/" + vacationToDelete.imageName;

    fs.unlink(imageToDelete, (err) => {
        if (err) {
            console.log(`Image to delete not found in path: "${imageToDelete}"`);
        }
        else console.log(`File was deleted in path: "${imageToDelete}"`);
    });

    socketLogic.reportDeleteVacation(id);
}

const UpdateFollowerCount = async (id: number): Promise<void> => {
    const sql = `UPDATE vacations SET followers = (SELECT COUNT(vacationId) as followers FROM user_tagged_vacations WHERE vacations.vacationId = user_tagged_vacations.vacationId)`;
    await dal.execute(sql);
}

const followerCount = async (id: number): Promise<number> => {
    // UPDATE vacations SET followers = (SELECT COUNT(vacationId) as followers FROM user_tagged_vacations WHERE vacations.vacationId = user_tagged_vacations.vacationId);

    const sql = `SELECT COUNT(vacationId) as followers FROM user_tagged_vacations WHERE vacationId = ${id}`;

    const result = await dal.execute(sql);
    const followerCount = result[0].followers;
    return followerCount;
}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation
}