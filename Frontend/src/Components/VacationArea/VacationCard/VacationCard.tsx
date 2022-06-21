import { useEffect, useState } from "react";
import VacationModel from "../../../Models/Vacation Model";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [imgSrc, setImgSrc] = useState<FileList>();


    useEffect(() => {
        vacationsService.getVacationImage(props.vacation.imageName)
            .then(image => {
                // console.log(image);
                
                setImgSrc(image)
            })
            .catch(err => notifyService.error(err.message));
    }, [])



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
                {/* <img src={imgSrc} /> */}
                {/* <img src={config.vacationImagesUrl + props.vacation.imageName} /> */}
            </div>

        </div>
    );
}

export default VacationCard;
