import { Link, useLocation } from "react-router-dom";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { useContext } from "react";

export default function SideBar() {
    const location = useLocation();

    const { logout, user } = useContext(AuthenticationContext);

    const isActive = (path) => (location.pathname === path ? 'active' : '');

    return (
      <aside className="sidebar">
        <ul className="sidebar-nav">
          <li>
            <Link
              className={`sidebar-link ${isActive("/dashboard")}`}
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className={`sidebar-link ${isActive("/products")}`}
              to="products"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className={`sidebar-link ${isActive("/change-pwd")}`}
              to="change-pwd"
            >
              Change Password
            </Link>
          </li>

          {/* add these lines */}
          {user.userType === "admin" && (
            <>
              <li>
                <Link
                  className={`sidebar-link ${isActive("users")}`}
                  to="users"
                >
                  Users
                </Link>
              </li>
              {/* add users */}
              <li>
                <Link
                  className={`sidebar-link ${isActive("add-user")}`}
                  to="add-user"
                >
                  Add User
                </Link>
              </li>
            </>
          )}
          {/* end here */}
          
          <li>
            <button className="btn btn-primary w-50" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </aside>
    );
}