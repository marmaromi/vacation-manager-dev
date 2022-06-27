import { NavLink } from "react-router-dom";
import Logout from "../../AuthArea/logout/logout";
import "./AdminArea.css";

function AdminArea(): JSX.Element {
    return (
        <div className="AdminArea container">
            <div className="row row-cols-auto justify-content-center">
                <div className="col-3"></div>
                <div className="col-6">
                    <NavLink to={"vacations"}>Vacations  |  </NavLink>
                    <NavLink to={"vacations/new"}>Add Vacation  |  </NavLink>
                    <NavLink to={"/reports"}>Reports</NavLink>
                </div>
                <span className="col-3"><Logout /></span>
            </div>
        </div>
    );
}

export default AdminArea;
