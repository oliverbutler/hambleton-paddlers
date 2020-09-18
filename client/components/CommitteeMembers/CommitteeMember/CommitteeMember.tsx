import React, { useState } from "react";
import styles from "./CommitteeMember.module.scss";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

const CommitteeMember = ({ index, member, openIndex, setOpenIndex }) => {
  var open = openIndex === index;

  const handleToggleOpen = () => {
    if (open) setOpenIndex(null);
    else setOpenIndex(index);
  };

  return (
    <div
      key={`committee-member-${index}`}
      className={styles.committeeMember + " py-3 px-3"}
      onClick={handleToggleOpen}
    >
      <article className="media mx-3 my-3">
        <figure className="media-left">
          <p className="image is-128x128">
            <img src={member.picture.url} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <h2>
              {member.given_name} {member.family_name}{" "}
              <span className="tag is-info is-medium is-light">
                {member.committee.role}
              </span>
            </h2>
            <p>{member.committee.summary}</p>
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ion-icon name="arrow-down-circle-outline" size="large"></ion-icon>
        </motion.div>
      </article>

      <AnimatePresence initial={false}>
        {open && (
          <div className="px-3">
            <motion.section
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
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
