import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const login = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    axios
      .post("http://localhost:1337/auth/local", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

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
        <h1 className="title">Login</h1>
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
