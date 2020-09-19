import React from "react";
import CommitteeMembers from "../components/CommitteeMembers";
import { motion } from "framer-motion";

const commitee_members = ({ content }) => {
  return (
    <main className="container my-5">
      <div className="content">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="title">Our Committee</h1>
          <CommitteeMembers content={content} />
        </motion.div>
      </div>
    </main>
  );
};

export default commitee_members;

export const getStaticProps = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/committee");
  var content = [];
  try {
    content = await res.json();
  } catch (err) {
    console.log("Server error");
  }

  return {
    props: {
      content,
    },
    revalidate: 1,
  };
};
