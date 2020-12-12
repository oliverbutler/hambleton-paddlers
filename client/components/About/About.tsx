import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

const About = ({ content }) => {
  const renderers = {
    image: ({ src, width, height }) => {
      return <Image src={src} width={250} height={175} />;
    },
  };

  return (
    <div className="mb-4">
      <ReactMarkdown source={content.main_body} renderers={renderers} />

      <br />

      {content.alerts.map((alert, alertIndex) => (
        <article className={`message is-${alert.type}`}>
          <div className="message-header">
            <p>{alert.header}</p>
          </div>
          <div className="message-body">
            <ReactMarkdown source={alert.body} renderers={renderers} />
          </div>
        </article>
      ))}
    </div>
  );
};

export default About;
