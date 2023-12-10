import React from "react";
import style from "./Nav.module.css";
import { NavLink, Outlet, Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav>
        <div className={style.nav_container}>
          <div className={style.nav_title_wrapper}>
            <Link to="/">
              <img
                className={style.logo}
                src="https://www.logolynx.com/images/logolynx/b4/b46e28f67317e0c6932a41a6feb308f9.png"
                alt="logo"
              />
            </Link>
            <h4> Learning </h4>
          </div>
          <div className={style.nav_details}>
            <button>
              <NavLink style={{ textDecoration: "none" }} to="/courses">
                {({ isActive }) => (isActive ? "On Courses" : "Go to Courses")}
              </NavLink>
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Nav;

