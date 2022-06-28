import { NavLink } from "react-router-dom";
import Logout from "../../AuthArea/logout/logout";
import "./AdminArea.css";

function AdminArea(): JSX.Element {
    return (
        <div className="AdminArea container-fluid">
            <div className="row row-cols-1 row-cols-sm-2">
                <div className="col left">
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
