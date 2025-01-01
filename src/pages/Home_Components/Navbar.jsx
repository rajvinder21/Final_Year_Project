import { Link } from "react-router-dom";


function Navbar() {


    return (
        <div>
            <nav className="myNav navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"> <img src="images/logo.png" alt=""/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="myList navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="myItem nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="myItem nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="myItem nav-item">
                                <a className="nav-link " href="#">Contact</a>
                            </li>
                            <li className="myItem nav-item">
                                <a className="nav-link " href="#">Login</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                        <Link to="/signup">   <button type="button" className=" myNavBtn btn btn-light">Sign up</button></Link>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;