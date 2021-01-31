import React, { useEffect, useState } from "react";
import { getInstance } from "utils/axios";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/actions";

import styles from "./Renewal.module.scss";

const Renewal = () => {
  // const membershipDetails = useSelector((s) => s.membershipDetails);
  const membershipDetails = [];
  const user = useSelector((s) => s.currentUser);
  const dispatch = useDispatch();

  // console.log(membershipDetails);
  // console.log(user);
  // user.payments.map((payment) => {
  //   console.log(payment.membership_detail);
  // });

  useEffect(() => {
    getInstance()
      .get("membership-details")
      .then((res) => {
        console.log(res.data);
        dispatch(actions.membershipDetails.setMembershipDetails(res.data));
      })
      .catch((e) => console.log(e));
  }, []);

  function twoDP(number) {
    return (Math.round(number * 100) / 100).toFixed(2);
  }

  function getYearRange(cost) {
    if (cost)
      return (
        <>
          {cost.start_date.substring(0, 4)}-{cost.end_date.substring(0, 4)}
        </>
      );
  }

  return (
    <div className="container my-5">
      <div className="content">
        <h1 className="title is-4">Renewal Costs</h1>

        <p>
          Below you can see the renewal cost for each year, you are able to
          extend your membership for the future year (
          {membershipDetails &&
            getYearRange(membershipDetails[membershipDetails.length - 1])}
          ), allowing you to ensure you never loose access to the latest events
          and trips from Hambleton Paddlers!
        </p>

        <p>
          <i>A family discount covers 2 adults and 4 children</i>
        </p>

        {membershipDetails.map((cost, index) => (
          <div className={styles.cost} key={`cost-${index}`}>
            <h1 className="title is-4">
              {getYearRange(cost)}
              {/* {cost.description && (
                <span className="ml-2 tag is-info is-light is-medium"></span>
              )} */}
              <span className="ml-2 tag is-success is-light is-medium">
                Paid
              </span>
            </h1>
            <p className="subtitle is-6">
              {cost.description || "Yearly Membership Fee"}
            </p>
            <div>
              <span className="tag is-large mr-2">
                Junior/Student £{twoDP(cost.junior_cost)}
              </span>
              <span className="tag is-large mr-2">
                Adult £{twoDP(cost.adult_cost)}
              </span>
              <span className="tag is-large">
                Family £{twoDP(cost.family_cost)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Renewal;
