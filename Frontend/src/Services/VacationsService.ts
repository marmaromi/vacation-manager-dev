import axios from "axios";
import VacationModel from "../Models/Vacation Model";
import { store } from "../Redux/Store";
import { addVacationsAction, deleteVacationAction, getAllVacationsAction, updateVacationAction } from "../Redux/VacationSlice";
import config from "../Utils/config";

class VacationsService {

    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = store.getState().vacationsStore.vacations;

        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(config.vacationsUrl);
            vacations = response.data;
            store.dispatch(getAllVacationsAction(vacations));
        }

        return vacations;
    }

    // private async getOneVacation(vacationId: number): Promise<VacationModel> {
    //     const vacations = store.getState().vacationsStore.vacations;
    //     let vacation = vacations.find(v => v.id === vacationId);

    //     if (!vacation) {
    //         const response = await axios.get<VacationModel>(config.vacationsUrl + vacationId);
    //         vacation = response.data;
    //         store.dispatch(getAllVacationsAction(vacations));
    //     }

    //     return vacation;
    // }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {

        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate);
        formData.append("endDate", vacation.endDate);
        formData.append("price", vacation.price.toString());
        formData.append("image", vacation.image.item(0));

        const response = await axios.post<VacationModel>(config.vacationsUrl, formData);
        const newVacation = response.data;

        store.dispatch(addVacationsAction(newVacation));
        return newVacation;
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        const response = await axios.put<VacationModel>(config.vacationsUrl + vacation.id, vacation);
        const updatedVacation = response.data;
        store.dispatch(updateVacationAction(updatedVacation));
        return updatedVacation;
    }

    public async deleteProduct(id: number): Promise<void> {
        await axios.delete(config.vacationsUrl + id)
        store.dispatch(deleteVacationAction(id));
    }

    public async getVacationImage(imageName: string): Promise<FileList> {

        const response = await axios.get<FileList>(config.vacationImagesUrl + imageName);
        const image = response.data;
        // console.log(image);

        return image;
    }
}

const vacationsService = new VacationsService();

export default vacationsService;