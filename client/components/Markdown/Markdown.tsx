import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "components/Image";

const renderers = {
  image: ({ src, alt }) => {
    return (
      <div className="about-image">
        <Image src={src} alt={alt} />
      </div>
    );
  },
  heading: ({ children, level }) => {
    switch (level) {
      case 1:
        return <h3 className="title is-3">{children}</h3>;
      case 2:
        return <h4 className="title is-4">{children}</h4>;
      case 3:
        return <h5 className="title is-5">{children}</h5>;
      case 4:
        return <h6 className="title is-6">{children}</h6>;
    }
  },
};

const Markdown = ({ children }) => {
  return <ReactMarkdown source={children} renderers={renderers} />;
};

export default Markdown;
