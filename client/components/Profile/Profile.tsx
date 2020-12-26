import React, { useEffect } from "react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import moment from "moment";
import Link from "next/link";
import { getInstance } from "utils/axios";
import { getToast } from "utils/functions";
import Checkout from "components/Checkout";

const Profile = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const user = currentUser.user;

  const payments = [];

  useEffect(() => {
    if (!currentUser.loggedIn) Router.push("/login");
  }, [currentUser]);

  if (!currentUser.loggedIn) return <p>Loading...</p>;

  return (
    <div className="container my-5">
      <div className="content">
        <h1>Dashboard</h1>

        <h3>Membership</h3>

        {payments.length > 0 ? (
          <p>
            Your membership {user.member && "will"} expire{!user.member && "d"}{" "}
            <b>{moment(payments.slice(-1)[0].date_end).fromNow()}</b>
          </p>
        ) : (
          <p>You have yet to purchase a membership</p>
        )}
        <Link href="checkout">
          <button
            className={"button " + (user.member ? "is-success" : "is-danger")}
          >
            {user.member ? "Renew" : "Purchase"} your membership
          </button>
        </Link>

        {/* <Checkout /> */}

        {/* <h1 className="title is-4">Payments</h1>
        {payments.map((payment, paymentIndex) => (
          <div key={`payment-${paymentIndex}`} className="ml-4 mb-4">
            <p>
              <b>Payment:</b> £{payment.amount_paid}{" "}
              <span className="tag">{payment.payment_method}</span> <br />
              <b>Paid:</b> {moment(payment.date_start).format("LL")} <br />
              <b>Expires:</b> {moment(payment.date_end).format("LL")}
            </p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Profile;
