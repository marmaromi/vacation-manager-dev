import axios from "axios";
import VacationModel from "../Models/Vacation Model";
import { store } from "../Redux/Store";
import { addVacationsAction, deleteVacationAction, getAllVacationsAction, editVacationAction } from "../Redux/VacationSlice";
import config from "../Utils/config";

class VacationsService {

    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = store.getState().vacationsStore.vacations;

        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(config.vacationsUrl);
            vacations = response.data;
        }
        const user = store.getState().authStore.user;
        const sortedVacations = await this.sortVacations(user.id, vacations);

        store.dispatch(getAllVacationsAction(sortedVacations));

        return sortedVacations;
    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const vacations = store.getState().vacationsStore.vacations;
        let vacation = vacations.find(v => v.id === vacationId);

        if (!vacation) {
            const response = await axios.get<VacationModel>(config.vacationsUrl + vacationId);
            vacation = response.data;
            store.dispatch(getAllVacationsAction(vacations));
        }
        return vacation;
    }

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

    public async editVacation(vacation: VacationModel): Promise<VacationModel> {
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate);
        formData.append("endDate", vacation.endDate);
        formData.append("price", vacation.price.toString());
        if (vacation?.image) {
            formData.append("image", vacation.image.item(0));
        }

        const response = await axios.put<VacationModel>(config.vacationsUrl + vacation.id, formData);
        const editedVacation = response.data;
        store.dispatch(editVacationAction(editedVacation));
        return editedVacation;
    }

    public async deleteVacation(id: number): Promise<void> {
        await axios.delete<void>(config.vacationsUrl + id)
        store.dispatch(deleteVacationAction(id));
    }

    public async getVacationImage(imageName: string): Promise<FileList> {
        const response = await axios.get<FileList>(config.vacationImagesUrl + imageName);
        const image = response.data;
        return image;
    }

    // followers related Methods
    public async vacationsUserFollows(userId: number): Promise<number[]> {
        const response = await axios.get<number[]>(config.followedVacations + userId);
        const followedVacations = response.data;
        return followedVacations;
    }

    public async followVacation(userId: number, vacationId: number): Promise<number[]> {
        const response = await axios.post<number[]>(config.followedVacations + userId + '/' + vacationId);
        const followedVacations = response.data;
        return followedVacations;
    }

    public async unFollowVacation(userId: number, vacationId: number): Promise<void> {
        await axios.delete<void>(config.followedVacations + userId + '/' + vacationId);
    }

    public async updateVacationFollowers(vacation: VacationModel): Promise<VacationModel> {
        const response = await axios.put<VacationModel>(config.followerCountUrl + vacation.id, vacation);
        const updatedVacation = response.data;
        updatedVacation.isFollowing = vacation.isFollowing;
        store.dispatch(editVacationAction(updatedVacation));
        return updatedVacation;
    }

    // other Methods
    public async sortVacations(userId: number, vacations: VacationModel[]): Promise<VacationModel[]> {
        const followedVacations = await this.vacationsUserFollows(userId);
        let newVac = vacations.map(vac => {
            let v: VacationModel = JSON.parse(JSON.stringify(vac));

            if (followedVacations.includes(v.id)) v.isFollowing = true;
            else v.isFollowing = false;

            return v;
        });

        // newVac.sort((x, y) => x.isFollowing === y.isFollowing ? 0 : x.isFollowing ? -1 : 1);
        newVac.sort((x, y) => {
            if (x.isFollowing === y.isFollowing) {
                return x.followers > y.followers ? -1 : 1;
            } else {
                return x.isFollowing > y.isFollowing ? -1 : 1;
            }
        }
        );

        return newVac;
    }

}

const vacationsService = new VacationsService();

export default vacationsService;
