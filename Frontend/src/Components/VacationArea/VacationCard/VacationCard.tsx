import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/Vacation Model";
import { store } from "../../../Redux/Store";
import vacationsService from "../../../Services/VacationsService";
// import notifyService from "../../../Services/NotifyService";
// import vacationsService from "../../../Services/VacationsService";
import config from "../../../Utils/config";
import editIcon from "../../../assets/images/edit-icon.png";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [role, setRole] = useState<string>('');

    useEffect(() => {
        const user = store.getState().authStore.user;

        if (user?.privileges === 'admin') {
            setRole(user.privileges);

        } else {
            setRole('')
        }
    }, []);

    // const [imgSrc, setImgSrc] = useState<FileList>();


    // useEffect(() => {
    //     vacationsService.getVacationImage(props.vacation.imageName)
    //         .then(image => {
    //             console.log(image);

    //             setImgSrc(image)
    //         })
    //         .catch(err => notifyService.error(err.message));
    // }, [])

    const startDate = new Date(props.vacation.startDate).toLocaleDateString("he-il");
    const endDate = new Date(props.vacation.endDate).toLocaleDateString("he-il");

    return (
        <div className="VacationCard Box" >
            <div>
                {/* <img src={imgSrc} /> */}
                <img src={config.vacationImagesUrl + props.vacation.imageName} />
            </div>

            <div className="textProp">
                <div className="topLeftImage">
                    {props.vacation.destination} <br />
                </div>
                <div className="bottomLeftImage">
                    {props.vacation.description}
                </div>
                <div className="dateAndPrice">
                    Dates: {startDate} - {endDate} <br />
                    Price: {props.vacation.price}$
                </div>
            </div>

            {role === 'admin' && <div className="bottomRight">
                <NavLink to={`/vacations/edit/${props.vacation.id}`}>
                    <img src={editIcon} />
                </NavLink><br />
                <button onClick={async (): Promise<void> => await vacationsService.deleteVacation(props.vacation.id)}>❌</button>
            </div>

                ||

                <p className="bottomRight">follow</p>
            }



        </div>
    );
}

export default VacationCard;
