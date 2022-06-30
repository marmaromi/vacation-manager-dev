import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
			<ul>
                issues:
                <li>following a card doesn't reorder until page refresh, not even on logout/login </li>
                <li>encrypt user id</li>
                <li>it's not really responsive for mobile</li>
                <li> center the admin menu but keep th logout on the right</li>
                <li>need to adjust footer size per content</li>
                <li>add real content to the footer</li>
                <li>upload to an external host</li>
                <li>add error log to the backend</li>
                <li>maybe encrypt user ids?</li>
            </ul>
        </div>
    );
}

export default Footer;
