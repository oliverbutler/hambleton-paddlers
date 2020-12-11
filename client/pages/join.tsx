import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const join = () => {
  return (
    <div
      className="container mt-5"
      style={{ minHeight: "75vh", display: "flex" }}
    >
      <div className="content">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="columns mt-5" style={{ textAlign: "center" }}>
            <div className="column is-half">
              <p className="title">Join via Email</p>
              <p>
                If you are interested in joining the Club, please contact our
                Membership Officer, Judith McKenzie for more information by
                emailing{" "}
                <a href="mailto:hambletonpaddlers02@gmail.com">
                  hambletonpaddlers02@gmail.com
                </a>{" "}
                Membership is available on either on an <b>individual</b> or{" "}
                <b>family</b> basis.
              </p>
            </div>
            <div className="column is-half">
              <p className="title">
                Join Online <span className="tag is-success">NEW</span>
              </p>
              <p>
                Please just fill out the form below to join us online! <br />{" "}
                Once we have your application we will process it as quickly as
                we can!
              </p>
              <Link href="/register">
                <button className="button is-primary my-4">
                  Join Us Online
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default join;
