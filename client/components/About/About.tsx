import React from "react";
import ReactMarkdown from "react-markdown";

const About = ({ content }) => {
  return (
    <div className="mb-4">
      <ReactMarkdown source={content.main_body} />

      <br />

      <article className="message is-warning">
        <div className="message-header">
          <p>COVID-19</p>
        </div>
        <div className="message-body">
          We’ve had a very challenging year due to the pandemic, but have kept
          in touch regularly with British Canoeing to ensure we were following
          their guidance and we are now pleased to announce that we are now back
          up and running.
        </div>
      </article>
    </div>
  );
};

export default About;
