import React from "react";
import ReactMarkdown from "react-markdown";

const About = ({ content }) => {
  return (
    <div className="mb-4">
      <ReactMarkdown source={content.main_body} />

      <br />

      {content.alerts.map((alert, alertIndex) => (
        <article className={`message is-${alert.type}`}>
          <div className="message-header">
            <p>{alert.header}</p>
          </div>
          <div className="message-body">
            <ReactMarkdown source={alert.body} />
          </div>
        </article>
      ))}
    </div>
  );
};

export default About;
