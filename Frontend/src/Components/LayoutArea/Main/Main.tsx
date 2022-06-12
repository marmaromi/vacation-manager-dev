import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/Vacation Model";
import authService from "../../../Services/AuthService";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../../VacationArea/VacationCard/VacationCard";
import "./Main.css";

function Main(): JSX.Element {
    const navigate = useNavigate();
    const [vacations, setVacation] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();


    // useEffect(() => {
    //     if (!authService.isLoggedIn()) {
    //         navigate("/login");
    //     }
    // }, [])

    useEffect(() => {
        if (!authService.isLoggedIn()) {
            navigate("/login");
        } else {
            setUser((jwtDecode(localStorage.getItem("token")) as any).user)
            vacationsService.getAllVacations()
                .then(vacations => setVacation(vacations))
                .catch(err => alert(err.message));
        }
        return;
    }, []);

    // useEffect(() => {

    //     // Load user when component starts: 
    //     return;

    // }, []);


    return (
        <div className="Main">

            {vacations.length === 0 && <Loading />}
            {vacations.map(v => <VacationCard key={v.id} vacation={v} />)}


        </div>
    );
}

export default Main;
