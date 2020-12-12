import React, { useEffect } from "react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import Setting from "./Setting";
import { getInstance } from "utils/axios";
import { getToast } from "utils/functions";

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

  const updateProperty = (member, propertyName, newValue) => {
    console.log(member._id, propertyName, newValue);

    getInstance()
      .put(`/members/${member._id}`, { [propertyName]: newValue })
      .then((res) => {
        getToast().fire({
          icon: "success",
          title: `Updated ${member.given_name}'s ${propertyName}`,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="title">Your Profile</h1>
      <p>
        <b>Email:</b> {user.email}
      </p>
      <h1 className="title is-4">Account Members</h1>
      <p>
        Below you can see the members of your Hambleton Paddlers account, please
        ensure that you keep this information up to date!
      </p>
      <div className="columns ">
        {user.members.map((member, index) => (
          <div className="column is-narrow">
            <figure
              className="image is-128x128 mx-2 my-2 mb-4"
              key={`attendee-${index}`}
            >
              <Image
                className="is-rounded"
                src={_.get(member, "picture.url", "")}
                width={128}
                height={128}
              />
            </figure>
            <Setting
              title="First Name"
              value={member.given_name}
              save={(val) => updateProperty(member, "given_name", val)}
            />
            <Setting
              title="Last Name"
              value={member.family_name}
              save={(val) => updateProperty(member, "family_name", val)}
            />
            <Setting
              title="Date of Birth"
              value={member.date_of_birth}
              disabled
            />

            <Setting
              title="Allergies"
              value={member.allergies}
              save={(val) => updateProperty(member, "allergies", val)}
              textarea
            />
            <Setting
              title="Other Medical Info"
              value={member.other_medical}
              save={(val) => updateProperty(member, "other_medical", val)}
              textarea
            />
          </div>
        ))}
      </div>

      <h1 className="title is-4">Membership</h1>
      {payments.length > 0 ? (
        <p>
          Your membership {user.member && "will"} expire{!user.member && "d"}{" "}
          <b>{moment(payments.slice(-1)[0].date_end).fromNow()}</b>
        </p>
      ) : (
        <p>You have yet to purchase a membership</p>
      )}
      <Link href="renew">
        <button
          className={"button " + (user.member ? "is-success" : "is-danger")}
        >
          {user.member ? "Renew" : "Purchase"} your membership
        </button>
      </Link>
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
      <h1 className="title is-4">Account Security</h1>
      <div className="field">
        <label className="label">New Password</label>
        <div className="control">
          <input className="input" type="password" placeholder="************" />
        </div>
      </div>
      <div className="field">
        <label className="label">Repeat</label>
        <div className="control">
          <input className="input" type="password" placeholder="************" />
        </div>
      </div>
      <button className="button is-info">Update Password</button>
    </div>
  );
};

export default Profile;
