import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div>
            <h1>this is not found</h1>
            <Link to="/">HomePage</Link>
        </div>
    );
}

export default NotFoundPage;