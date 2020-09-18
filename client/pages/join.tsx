import React from "react";
import Link from "next/link";

const join = () => {
  return (
    <div
      className="container mt-5"
      style={{ minHeight: "75vh", display: "flex" }}
    >
      <div className="content">
        <div className="columns mt-5" style={{ textAlign: "center" }}>
          <div className="column is-half">
            <p className="title">Join via Email</p>
            <p>
              If you are interested in joining the Club, please contact our
              Membership Officer, Judith McKenzie for more information by
              emailing{" "}
              <a href="mailto:hambletonpaddlers@gmail.co.uk">
                hambletonpaddlers@gmail.co.uk
              </a>{" "}
              Membership is available on either on an <b>individual</b> or{" "}
              <b>family</b> basis.
            </p>
          </div>
          <div className="column is-half">
            <p className="title">
              Join Online <span className="tag is-success">COMING SOON</span>
            </p>
            <p>
              Please just fill out the form below to join us online! <br /> Once
              we have your application we will process it as quickly as we can!
            </p>
            <Link href="/register">
              <button className="button is-primary my-4" disabled>
                Join Us Online
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default join;
