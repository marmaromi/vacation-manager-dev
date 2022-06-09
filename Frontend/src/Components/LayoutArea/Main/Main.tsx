import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/Vacation Model";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../../VacationArea/VacationCard/VacationCard";
import "./Main.css";

function Main(): JSX.Element {

    const [vacations, setVacation] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();


    useEffect(() => {
        vacationsService.getAllVacations()
            .then(vacations => setVacation(vacations))
            .catch(err => alert(err.message));
    }, []);

    useEffect(() => {

        // Load user when component starts: 

        setUser(JSON.parse(localStorage.getItem("token")));
        return;

    }, []);


    return (
        <div className="Main">

            {vacations.length === 0 && <Loading />}
            {vacations.map(v => <VacationCard key={v.id} vacation={v} />)}


        </div>
    );
}

export default Main;
