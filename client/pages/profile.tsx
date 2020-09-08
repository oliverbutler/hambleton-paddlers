import React, { useEffect } from "react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

const profile = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser.loggedIn) Router.push("/login");
  }, [currentUser]);

  if (!currentUser.loggedIn) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Profile</h1>
        <p>
          Hello {currentUser.user.given_name}{" "}
          <span className="tag is-primary">
            {_.get(currentUser, "user.role.name")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default profile;
