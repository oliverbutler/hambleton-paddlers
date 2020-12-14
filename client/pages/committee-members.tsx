import React from "react";
import CommitteeMembers from "../components/CommitteeMembers";
import { motion } from "framer-motion";
import Axios from "axios";

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
  const content = await Axios.get(
    process.env.NEXT_PUBLIC_HOST + "/committee-members"
  )
    .then((res) => res.data)
    .catch(() => []);

  return {
    props: {
      content,
    },
    revalidate: 1,
  };
};
