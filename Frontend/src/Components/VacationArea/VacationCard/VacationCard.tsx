import VacationModel from "../../../Models/Vacation Model";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard">


            <div>
                {props.vacation.description}
                {props.vacation.destination}
                {props.vacation.startDate} - {props.vacation.endDate}
                {props.vacation.price}
            </div>

            <div>
                {/* <img src= /> */}
            </div>

        </div>
    );
}

export default VacationCard;
