import axios from "axios";
import VacationModel from "../Models/Vacation Model";
import config from "../Utils/config";

class VacationsService {

    public async getAllVacations(): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(config.vacationsUrl);
        const vacations = response.data;
        return vacations;

    }
}

const vacationsService = new VacationsService();

export default vacationsService;