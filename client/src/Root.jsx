import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("bloodDonToken"))
  );

  useEffect(() => {
    const onStorage = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("bloodDonToken")));
    };

    // Custom event for same-tab updates
    const onAuthChanged = () => onStorage();

    window.addEventListener("storage", onStorage);
    window.addEventListener("authChanged", onAuthChanged);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChanged", onAuthChanged);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bloodDonToken");
    // notify other listeners in same tab
    window.dispatchEvent(new Event("authChanged"));
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="app-root">
      <header className="navbar">
        <div className="brand">
          <NavLink to="/" className={({ isActive }) => (isActive ? "brand-link active" : "brand-link")}>BloodDonationApp</NavLink>
        </div>

        <nav className="nav-links">
          {isAuthenticated ? (
            <>
              <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Home
              </NavLink>
              <NavLink to="/add-request" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Add Request
              </NavLink>
              <button className="nav-link btn-secondary" onClick={handleLogout} style={{ border: 'none', background: 'transparent' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </header>

      <main className="app-container">
        <Outlet />
      </main>

      <footer className="app-footer">© {new Date().getFullYear()} BloodDonationApp</footer>
    </div>
  );
};

export default RootLayout;
