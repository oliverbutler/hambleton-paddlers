import React, { useState } from "react";
import styles from "./CommitteeMember.module.scss";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CommitteeMember = ({ index, member, openIndex, setOpenIndex }) => {
  var open = openIndex === index;

  const handleToggleOpen = () => {
    if (open) setOpenIndex(null);
    else setOpenIndex(index);
  };

  return (
    <div
      key={`committee-member-${index} `}
      className={styles.committeeMember + " py-3 my-3 mx-3 "}
      onClick={handleToggleOpen}
    >
      <div className="columns mb-0">
        <div className="column is-narrow pr-0">
          <p className="image is-128x128 ml-3">
            <img
              src={
                member.picture
                  ? member.picture.url
                  : "https://hambleton-paddlers.s3.eu-west-2.amazonaws.com/default_user_4f14e60794.png"
              }
            />
          </p>
        </div>
        <div className="column ml-3">
          <p className="title is-4">
            {member.given_name} {member.family_name}{" "}
            <span className="tag is-info is-medium is-light">
              {member.committee.role}
            </span>
          </p>
          <p>{member.committee.summary}</p>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <div className="mx-3">
            <motion.section
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: {
                  opacity: 1,
                  height: "auto",
                },
                collapsed: {
                  opacity: 0,
                  height: 0,
                },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <ReactMarkdown source={member.committee.description} />
            </motion.section>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommitteeMember;
