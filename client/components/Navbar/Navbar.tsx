import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import actions from "redux/actions";
import { getToast } from "utils/functions";
import MenuToggle from "./MenuToggle";
import { motion } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(false);

  const router = useRouter();

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleClose = () => setIsActive(false);

  return (
    <nav
      className={"navigation " + (isActive ? "active" : "")}
      role="navigation"
      aria-label="main navigation"
      ref={wrapperRef}
    >
      <div className="navigation-top">
        <div className="navigation-brand">
          <Link href="/">
            <a onClick={handleClose}>
              <Image alt="brand logo" src="/logo.png" width={40} height={40} />
            </a>
          </Link>
        </div>
        <div className="navigation-menu">
          <a onClick={() => setIsActive(!isActive)}>
            <MenuToggle isActive={isActive} />
          </a>
        </div>
      </div>

      <motion.div
        className="navigation-motion"
        initial={{
          height: 0,
        }}
        animate={{
          height: isActive ? "auto" : 0,
        }}
      >
        <div className="left">
          <Link href="/about">
            <a className="navbar-item" onClick={handleClose}>
              About
            </a>
          </Link>

          <Link href="/committee-members">
            <a className="navbar-item" onClick={handleClose}>
              Committee
            </a>
          </Link>

          <Link href="/events">
            <a className="navbar-item" onClick={handleClose}>
              Events
            </a>
          </Link>

          <Link href="/awards">
            <a className="navbar-item" onClick={handleClose}>
              BCU Awards
            </a>
          </Link>
        </div>

        <div className="right">
          {!currentUser.loggedIn ? (
            <>
              <Link href="/join">
                <a className="button is-primary" onClick={handleClose}>
                  <strong>Join</strong>
                </a>
              </Link>
              <Link href="/login">
                <a className="button is-light" onClick={handleClose}>
                  Log in
                </a>
              </Link>
            </>
          ) : router.pathname.startsWith("/profile") ? (
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
                Logout
              </a>
            </Link>
          ) : (
            <Link href="/profile">
              <a className="button is-primary" onClick={handleClose}>
                My Profile
              </a>
            </Link>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
