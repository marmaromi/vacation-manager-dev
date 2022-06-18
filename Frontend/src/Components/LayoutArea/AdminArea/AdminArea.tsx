import { NavLink } from "react-router-dom";
import "./AdminArea.css";

function AdminArea(): JSX.Element {
    return (
        <div className="AdminArea">
			<NavLink to={"vacations"}>Vacations  |  </NavLink>
			<NavLink to={"vacations/new"}>Add Vacation  |  </NavLink>
			<NavLink to={"/reports"}>Reports</NavLink>
        </div>
    );
}

export default AdminArea;
