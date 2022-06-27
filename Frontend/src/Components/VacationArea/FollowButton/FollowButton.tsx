import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/Vacation Model";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./FollowButton.css";

interface FollowButtonProps {
    vacation: VacationModel;
    user: UserModel;
}

function FollowButton(props: FollowButtonProps): JSX.Element {

    const [following, setFollowing] = useState<boolean>();
    const [totalFollowers, setTotalFollowers] = useState<number>(props.vacation.followers);
    const [followedVacations, setFollowedVacations] = useState<number[]>([]);

    useEffect(() => { // check if the user is following the vacation        
        vacationsService.vacationsUserFollows(props.user.id)
            .then(followedVacations => {
                setFollowedVacations(followedVacations);
                if (followedVacations.includes(props.vacation.id)) {
                    setFollowing(true);
                }
                else setFollowing(false);
            })
            .catch(err => notifyService.error(err.message));


    }, []);

    function followVacation(): void {
        vacationsService.followVacation(props.user.id, props.vacation.id)
            .then(followedVacations => {
                setFollowedVacations(followedVacations);
                setTotalFollowers(totalFollowers + 1);
            })
            .catch(err => {
                notifyService.error(err);
                console.log(err);

            });
        setFollowing(true)
    }

    function unFollowVacation(): void {
        vacationsService.unFollowVacation(props.user.id, props.vacation.id)
            .then(() => {
                setFollowedVacations(followedVacations.splice(followedVacations.indexOf(props.vacation.id), 1))
                setTotalFollowers(totalFollowers - 1);
            })
            .catch(err => {
                notifyService.error(err);
                console.log(err);

            });
        setFollowing(false)
    }

    return (
        <div className="FollowButton">
            {
                !following && <button type="button" className="btn btn-primary" onClick={() => followVacation()}> Follow <span className="badge bg-secondary">{totalFollowers}</span> </button>
                ||
                <button type="button" className="btn btn-success" onClick={() => unFollowVacation()}> Following <span className="badge bg-secondary">{totalFollowers}</span> </button>
            }

        </div>
    );
}

export default FollowButton;
