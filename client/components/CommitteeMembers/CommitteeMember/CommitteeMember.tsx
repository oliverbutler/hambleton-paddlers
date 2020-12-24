import React, { useState } from "react";
import styles from "./CommitteeMember.module.scss";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "components/Image";

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
          <div className="image is-128x128 ml-3">
            {member.member.picture && (
              <Image
                image={member.member.picture}
                blur
                width={128}
                height={128}
              />
            )}
          </div>
        </div>
        <div className="column ml-3">
          <p className="title is-4">
            {member?.member?.given_name} {member?.member?.family_name}{" "}
            <span className="tag is-info is-medium is-light">
              {member?.role}
            </span>
          </p>
          <p>{member?.summary}</p>
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
              <ReactMarkdown source={member?.description} />
            </motion.section>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommitteeMember;
