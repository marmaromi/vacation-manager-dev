import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/Vacation Model";
import { store } from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import socketService from "../../../Services/SocketService";
import vacationsService from "../../../Services/VacationsService";
import VacationCard from "../VacationCard/VacationCard";
import notifyService from "../../../Services/NotifyService";

function VacationList(): JSX.Element {
    const navigate = useNavigate();
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {

        socketService.connect();

        if (!authService.isLoggedIn()) navigate("/login");
        else {
            vacationsService.getAllVacations()
                .then(vacations => setVacations(vacations))
                .catch(err => notifyService.error(err));
        }

        return () => socketService.disconnect();
    }, []);

    useEffect(() => {
        const user = store.getState().authStore.user;
        const unsubscribe = store.subscribe(() => {
            const updatedVacationList = store.getState().vacationsStore.vacations;
            setVacations(updatedVacationList);
            vacationsService.sortVacations(user.id, updatedVacationList)
                .then(sortedVacations => setVacations(sortedVacations))
                .catch(err => console.log(err));
        });

        return () => unsubscribe();
    }, [])

    return (
        <div className="VacationList">
            {vacations.map(v => <VacationCard key={v.id} vacation={v} />)}

        </div>
    );
}

export default VacationList;
