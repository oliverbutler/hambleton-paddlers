import React from "react";

const membership = () => {
  return (
    <main className="container my-5">
      <h1 className="title">Membership</h1>
      <p>
        If you are interested in joining the Club, please contact our Membership
        Officer, Judith McKenzie via the form below, you may also email{" "}
        <a href="mailto:hambletonpaddlers@gmail.co.uk">
          hambletonpaddlers@gmail.co.uk
        </a>
        <br /> <br />
        Membership is available on either on an individual or family basis.
      </p>
      <div className="columns mt-4">
        <div className="column is-one-third">
          <form>
            <div className="field">
              <label className="label">Your Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="John Smith" />
              </div>
            </div>
            <div className="field">
              <label className="label">Your Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="johnsmith@gmail.com"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Message</label>
              <div className="control">
                <textarea className="input" />
              </div>
            </div>
            <button className="button is-primary">Send</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default membership;
