import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";
import fs from "fs";


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

    const vacations = await dal.execute(sql);
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

    const sql = `INSERT INTO vacations 
    VALUES(DEFAULT, '${vacation.description}', '${vacation.destination}', '${vacation.startDate}',
     '${vacation.endDate}',${vacation.price}, '${vacation.imageName}', 0)`;

    const result: OkPacket = await dal.execute(sql);
    vacation.id = result.insertId;
    return vacation;
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    const errors = vacation.validatePut();
    if (errors) {
        throw new ValidationError(errors);
    }

    if (vacation.image) {

        const vacationToUpdate = await getOneVacation(vacation.id);
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

    const sql = `UPDATE vacations 
                 SET description = '${vacation.description}',
                     destination = '${vacation.destination}',
                     startDate = '${vacation.startDate}',
                     endDate = '${vacation.endDate}',
                     price = ${vacation.price},
                     imageName = '${vacation.imageName}',
                     followers = ${vacation.followers}
                 WHERE vacationId = ${vacation.id}`;

    const result: OkPacket = await dal.execute(sql);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(vacation.id);
    }
    return vacation;
}

const deleteVacation = async (id: number): Promise<void> => {
    const sql = `DELETE FROM vacations WHERE vacationId = ${id}`
    const result: OkPacket = await dal.execute(sql);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(id);
    }
}







// const followerCount = async (id: number): Promise<number> => {
//     // UPDATE vacations SET followers = (SELECT COUNT(vacationId) as followers FROM user_tagged_vacations WHERE vacations.vacationId = user_tagged_vacations.vacationId);

//     const sql = `SELECT COUNT(vacationId) as followers FROM user_tagged_vacations WHERE vacationId = ${id}`;

//     const result = await dal.execute(sql);
//     const followerCount = result[0].followers;
//     return followerCount;
// }


const UpdateFollowerCount = async (id: number): Promise<void> => {

    const sql = `UPDATE vacations SET followers = (SELECT COUNT(vacationId) as followers FROM user_tagged_vacations WHERE vacations.vacationId = user_tagged_vacations.vacationId)`;
    const result = await dal.execute(sql);

}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation
}