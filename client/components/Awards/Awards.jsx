import React from "react";
import styles from "./Awards.module.scss";
import ReactMarkdown from "react-markdown";

const Awards = ({ awards }) => {
  return (
    <div>
      {awards.map((award) => (
        <div className={styles.award + " mb-5"}>
          <h2 className="title is-4">{award.title}</h2>
          <p className="subtitle">{award.summary}</p>
          <ReactMarkdown source={award.description} />
        </div>
      ))}
    </div>
  );
};

export default Awards;
