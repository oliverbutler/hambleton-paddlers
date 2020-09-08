import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import actions from "redux/actions";
import { getToast } from "utils/functions";
import Router from "next/router";

const login = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:1337/auth/local", data)
      .then((res) => {
        dispatch(actions.user.setUser(res.data.user));
        getToast().fire({ icon: "success", title: "Successfully Logged In" });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (currentUser.loggedIn) Router.push("/profile");
  }, [currentUser]);

  return (
    <div
      className="container mt-5"
      style={{
        minHeight: "75vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                name="identifier"
                ref={register({ required: true })}
                className="input"
                type="text"
                placeholder="johnsmith@gmail.com"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                name="password"
                ref={register({ required: true })}
                className="input"
                type="password"
                placeholder="**********"
              />
            </div>
          </div>
          <button className="button is-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default login;
