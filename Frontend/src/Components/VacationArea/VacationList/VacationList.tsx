import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/Vacation Model";
import { store } from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import socketService from "../../../Services/SocketService";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import notifyService from "../../../Services/NotifyService";

function VacationList(): JSX.Element {
    const navigate = useNavigate();
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {

        socketService.connect();

        if (!authService.isLoggedIn()) {
            navigate("/login");
        }
        else {
            vacationsService.getAllVacations()
                .then(vacations => setVacations(vacations))
                .catch(err => notifyService.error(err.message));
        }

        const unsubscribe = store.subscribe(() => {
            const dup = [...store.getState().vacationsStore.vacations];
            // console.log(dup);

            // const user = store.getState().authStore.user;
            // vacationsService.sortVacations(user.id, dup)
            //     .then(sortedVacations => setVacations(sortedVacations))
            //     .catch(err => console.log(err));
        });

        return () => {
            socketService.disconnect();
            unsubscribe();
        };
        // eslint-disable-next-line
    }, []);
    return (
        <div className="VacationList">
            {vacations.length === 0 && <Loading />}
            {vacations.map(v => <VacationCard key={v.id} vacation={v} />)}

        </div>
    );
}

export default VacationList;
