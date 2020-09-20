import React from "react";
import { motion } from "framer-motion";
import Awards from "components/Awards";
import axios from "axios";

const awards = ({ awards, coachingAwards }) => {
  return (
    <main className="container my-5" style={{ minHeight: "75vh" }}>
      <div className="content">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <img
            src="/bcu.png"
            alt="British Canoeing Logo"
            style={{ width: 300 }}
          />
          <h1 className="title">BCU Awards</h1>
          <p className="subtitle">
            We offer you the oppertunity to obtain the following BCU awards...
          </p>
          <Awards awards={awards} />
          <h1 className="title">BCU Coaching Awards</h1>
          <p className="subtitle">
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
  const awards = await axios
    .get(process.env.NEXT_PUBLIC_HOST + "/bcu-awards")
    .then((res) => res.data)
    .catch(() => []);

  const coachingAwards = await axios
    .get(process.env.NEXT_PUBLIC_HOST + "/bcu-coaching-awards")
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
