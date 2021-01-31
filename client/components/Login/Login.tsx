import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import actions from "redux/actions";
import { getToast } from "utils/functions";
import Router from "next/router";
import _ from "lodash";
import { getInstance } from "utils/axios";

const Login = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    getInstance()
      .post("/auth/local", data)
      .then((res) => {
        dispatch(actions.user.setUser(res.data.user));
        getToast().fire({ icon: "success", title: "Successfully Logged In" });
        localStorage.setItem("accessToken", res.data.jwt);
      })
      .catch((err) => {
        if (
          _.get(err, "response.data.message[0].messages[0].id") ==
          "Auth.form.error.confirmed"
        )
          getToast().fire({
            icon: "warning",
            title: "Please confirm your email",
          });
        else
          getToast().fire({
            icon: "error",
            title: "Incorrect email or password",
          });
      });
  };

  useEffect(() => {
    if (currentUser.loggedIn) Router.push("/profile");
  }, [currentUser]);

  return (
    <div>
      <p className="title">
        Login <span className="tag is-success">NEW</span>
      </p>
      <p>
        The login capabilities are coming soon to all members, <br /> once they
        are available all members will have to register
      </p>
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
  );
};

export default Login;
