import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import authService from "../../../Services/AuthService";
import Logout from "../../AuthArea/logout/logout";
import "./AdminArea.css";

function AdminArea(): JSX.Element {

    const [totalUsers, setTotalUsers] = useState<number>(0);

    useEffect(() => {
        authService.getUserCount()
            .then(count => setTotalUsers(count))
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="AdminArea container-fluid">
            <div className="row row-cols-1 row-cols-sm-3">
            <p className="col left">Registered users:  {totalUsers}</p>
                <div className="col">
                    <NavLink to={"vacations"}>Vacations  |  </NavLink>
                    <NavLink to={"vacations/new"}>Add Vacation  |  </NavLink>
                    <NavLink to={"/reports"}>Reports</NavLink>
                </div>
                <span className="col right"><Logout /></span>
            </div>
        </div>
    );
}

export default AdminArea;
