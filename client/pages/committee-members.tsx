import React from "react";
import CommitteeMembers from "../components/CommitteeMembers";
import { motion } from "framer-motion";
import Axios from "axios";
import { getInstance } from "utils/axios";

const commitee_members = ({ content }) => {
  return (
    <main className="container my-5">
      <div className="content">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="title">Our Committee</h1>
          <p>
            <i>
              {" "}
              <b>Click</b> on each member to read about their role
            </i>
          </p>
          <CommitteeMembers content={content} />
        </motion.div>
      </div>
    </main>
  );
};

export default commitee_members;

export const getStaticProps = async () => {
  const content = await getInstance()
    .get("/committee-members")
    .then((res) => res.data)
    .catch(() => {
      console.error("[Axios] Cannot fetch /committee-members");
      return [];
    });

  return {
    props: {
      content,
    },
    revalidate: 1,
  };
};
