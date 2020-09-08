import React from "react";

const About = () => {
  return (
    <div className="mb-4">
      <h1 className="title">Who are we?</h1>
      <p>
        A very warm welcome to Hambleton Paddlers Canoe and Kayak Club based in
        beautiful North Yorkshire.{" "}
      </p>
      <br />
      <p>
        Established in 2002, Hambleton Paddlers is a family-friendly club
        offering a wide range of activities and events catering for everyone
        from complete beginners to experienced paddlers.
        <br /> <br />
        Hambleton Paddlers aim to introduce anyone to the pleasures of kayaking
        and canoeing in a safe environment. We promote the{" "}
        <a href="https://www.britishcanoeing.org.uk/">British Canoeing</a> Award
        Scheme and for those who wish to aspire to the coaching side of the
        sport, we have an active support scheme in operation.
        <br /> <br />
        Over the summer months Hambleton Paddlers Canoe Club is based at Carlton
        Lodge Activity Centre, where we hold our weekly lake-based Club
        sessions, that offer both structured training and fun based activities.
        <br /> <br />
        When the weather turns chilly, Hambleton Paddlers take to the waters of
        Richmond Swimming Pool to enhance our skills learnt ready for the next
        trip!
        <br /> <br />
        Our <a href="https://www.britishcanoeing.org.uk/">
          British Canoeing
        </a>{" "}
        registered club coaches deliver high quality training suited to both
        open canoe and kayak paddlers at various levels of ability. Hambleton
        Paddlers owns a fleet of kayaks and Canadian canoes which are available
        for use by club members. We also have a full range of buoyancy aids,
        cagoules, helmets, spray decks, paddles and other equipment for members
        to use.
      </p>
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
