import VacationModel from "../../../Models/Vacation Model";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const startDate = new Date(props.vacation.startDate).toLocaleDateString("he-il");
    const endDate = new Date(props.vacation.endDate).toLocaleDateString("he-il");
    

    return (
        <div className="VacationCard Box">


            <div>
                {props.vacation.description} <br />
                {props.vacation.destination} <br />
                {startDate} - {endDate} <br />
                {props.vacation.price}$
            </div>

            <div>
                -----------------------------------------
                {/* <img src= /> */}
            </div>

        </div>
    );
}

export default VacationCard;
