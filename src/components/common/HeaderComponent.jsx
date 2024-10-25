import { NavLink } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            Employee Management System
          </a>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/memberList">
                  member
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-brand">Dev Mode</div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
