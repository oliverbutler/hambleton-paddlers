import Image from "components/Image";
import Markdown from "components/Markdown";
import React from "react";

const renderComponent = (component) => {
  switch (component.__component) {
    case "page.text":
      return <Markdown>{component.rich_text}</Markdown>;
    case "page.carousel":
      return (
        <div className="carousel">
          {component.photos.map((photo, index) => (
            <Image image={photo} blur key={`photo-${index}`} />
          ))}
        </div>
      );
    default:
      return <p></p>;
  }
};

const PageContent = ({ content }) => {
  return (
    <div>
      {content &&
        content.map((component, index) => (
          <div key={`component-${index}`} className="content-component">
            {renderComponent(component)}
          </div>
        ))}
    </div>
  );
};

export default PageContent;
