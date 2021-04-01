import React from "react";
import { motion } from "framer-motion";
import Awards from "components/Awards";
import axios from "axios";
import Image from "components/Image";
import { getInstance } from "utils/axios";

const awards = ({ awards, coachingAwards }) => {
  return (
    <main className="container my-5" style={{ minHeight: "75vh" }}>
      <div className="content">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ width: 395, height: 163 }}>
            <Image src="/bcu.png" alt="British Canoeing Logo" />
          </div>

          <p className="title is-3">BCU Awards</p>
          <p className="subtitle is-5">
            We offer you the opportunity to obtain the following BCU awards...
          </p>
          <Awards awards={awards} />
          <p className="title is-3">BCU Coaching Awards</p>
          <p className="subtitle is-5">
            We also offer the following BCU coaching awards
          </p>
          <Awards awards={coachingAwards} />
        </motion.div>
      </div>
    </main>
  );
};

export default awards;

export const getStaticProps = async () => {
  const awards = await getInstance()
    .get("/bcu-awards")
    .then((res) => res.data)
    .catch(() => []);

  const coachingAwards = await getInstance()
    .get("/bcu-coaching-awards")
    .then((res) => res.data)
    .catch(() => []);

  return {
    props: {
      awards,
      coachingAwards,
    },
    revalidate: 1,
  };
};
