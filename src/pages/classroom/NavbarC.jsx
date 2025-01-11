function NavbarC({ toggleSidebar }) {
    return (
      <nav className="navbar navbar-light bg-light d-md-none">
        <button className="navbar-toggler" type="button" aria-label="Toggle navigation" onClick={toggleSidebar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <h5 className="mb-0">@ Virtual Classroom</h5>
      </nav>
    );
  }

  export default NavbarC