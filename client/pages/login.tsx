import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import actions from "redux/actions";
import { getToast } from "utils/functions";
import Router from "next/router";
import { motion } from "framer-motion";

const login = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    axios
      .post(process.env.NEXT_PUBLIC_HOST + "/auth/local", data)
      .then((res) => {
        dispatch(actions.user.setUser(res.data.user));
        getToast().fire({ icon: "success", title: "Successfully Logged In" });
        localStorage.setItem("accessToken", res.data.jwt);
      })
      .catch((err) => {
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
    <div
      className="container mt-5"
      style={{
        minHeight: "75vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="content">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="title">
            Login <span className="tag is-success">COMING SOON</span>
          </p>
          <p>
            The login capabilities are coming soon to all members, <br /> once
            they are available all members will have to register
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
        </motion.div>
      </div>
    </div>
  );
};

export default login;
