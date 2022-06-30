import { useEffect } from "react";
import { store } from "../../../Redux/Store";
import vacationsService from "../../../Services/VacationsService";
import "./PageNotFound.css";

function PageNotFound(): JSX.Element {
    useEffect(() => {
        // not really necessary for this component, a stupid solution to make admin layout show on page reload...
        let vacations = store.getState().vacationsStore.vacations;
        if (vacations.length === 0) {
            vacationsService.getAllVacations()
        }
    }, []);
    return (
        <div className="PageNotFound">

            <p>The page you are looking for doesn't exist.</p>

        </div>
    );
}

export default PageNotFound;
