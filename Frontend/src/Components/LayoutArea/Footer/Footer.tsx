import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">

            <div className="container-flex p-0 m-0">
                <div className="border-bottom">
                    <p>About this site</p>
                    <ul>
                    <li> Users: <ul>
                        <li>Track available vacations.</li>
                        <li>View changes in the site in real time - Vacation added, updated or deleted by the site admin - Vacations follower count changed by other users (Socket.IO).</li>
                        </ul> </li>
                    <li> Admin: <ul>
                        <li>Add, update and delete vacations.</li>
                        <li>View total registered users count.</li>
                        <li>View a bar chart report of the followed vacations.</li>
                        </ul></li>

                    </ul>
                </div>
                <p className="text-muted">&copy; 2022 Ido Marom</p>
            </div>

        </div>
    );
}

export default Footer;
