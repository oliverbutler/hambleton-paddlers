import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import actions from "redux/actions";
import { getToast } from "utils/functions";

const Navbar = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const router = useRouter();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item py-0">
            <img src="/logo.png" height={50} style={{ maxHeight: 50 }} />
          </a>
        </Link>
        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link href="/">
            <a className="navbar-item">Home</a>
          </Link>

          <Link href="/events">
            <a className="navbar-item">Events</a>
          </Link>
          <Link href="/committee-members">
            <a className="navbar-item">Committee</a>
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {currentUser.loggedIn ? (
                router.pathname == "/profile" ? (
                  <Link href="/">
                    <a
                      className="button is-primary is-outlined"
                      onClick={() => {
                        dispatch(actions.user.logOut());
                        localStorage.removeItem("accessToken");
                        getToast().fire({
                          icon: "success",
                          title: "Successfully Logged Out",
                        });
                      }}
                    >
                      <b>Logout</b>
                    </a>
                  </Link>
                ) : (
                  <Link href="/profile">
                    <a className="button is-primary">
                      <b>My Profile</b>
                    </a>
                  </Link>
                )
              ) : (
                <>
                  <Link href="/join">
                    <a className="button is-primary">
                      <strong>Join</strong>
                    </a>
                  </Link>
                  <Link href="/login">
                    <a className="button is-light">Log in</a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
