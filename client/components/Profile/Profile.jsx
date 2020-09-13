import React, { useEffect } from "react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import moment from "moment";

const Profile = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const user = currentUser.user;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser.loggedIn) Router.push("/login");
  }, [currentUser]);

  if (!currentUser.loggedIn) return <p>Loading...</p>;

  var payments = user.payments.sort((a, b) =>
    moment(a.date_start) > moment(b.date_start) ? 1 : -1
  );

  return (
    <div>
      <h1 className="title">Your Profile</h1>
      <p>
        <b>Username:</b> {user.username} <br />
        <b>Email:</b> {user.email}
      </p>
      <h1 className="title is-4">Allergies</h1>
      <h1 className="title is-4">Membership</h1>
      {payments.length > 0 ? (
        <p>
          Your membership {user.member && "will"} expire{!user.member && "d"}{" "}
          <b>{moment(payments.slice(-1)[0].date_end).fromNow()}</b>
        </p>
      ) : (
        <p>You have yet to purchase a membership</p>
      )}
      <button
        className={"button " + (user.member ? "is-success" : "is-danger")}
      >
        {user.member ? "Renew" : "Purchase"} your membership
      </button>
      <h1 className="title is-4">Payments</h1>
      {payments.map((payment, paymentIndex) => (
        <div key={`payment-${paymentIndex}`} className="ml-4 mb-4">
          <p>
            <b>Payment:</b> £{payment.amount_paid}{" "}
            <span className="tag">{payment.payment_method}</span> <br />
            <b>Paid:</b> {moment(payment.date_start).format("LL")} <br />
            <b>Expires:</b> {moment(payment.date_end).format("LL")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
