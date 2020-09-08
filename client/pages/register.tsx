import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import _ from "lodash";

const register = () => {
  const [members, setMembers] = useState(false);
  const [family, setFamily] = useState([{}]);

  const addFamilyMember = () => {
    setFamily([...family, {}]);
  };

  const deleteFamilyMember = (index) => {
    var fam = [...family];
    fam.splice(index, 1);
    setFamily(fam);
  };

  return (
    <div className="container my-5">
      <div className="content">
        <p className="title">
          Register for a Membership Online{" "}
          <span className="tag is-success">NEW</span>
        </p>

        <p>
          Registering for an account will create you a Hambleton Paddlers
          account which will allow you to
        </p>
        <ul>
          <li>Check your membership</li>
          <li>View upcomming events</li>
          <li>Submit forms for upcomming events</li>
        </ul>
        <p>
          Once your request has being submitted we will look over the request
          before contacting you directly at your given email
        </p>
        <div className="columns mt-4">
          <div className="column">
            <form>
              <div className="field-body">
                <div className="field">
                  <label className="label">First Name</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="John" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Last Name</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="Smith" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Age</label>
                  <div className="control">
                    <input className="input" type="numbers" />
                  </div>
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
              <div className="field is-expanded">
                <label className="label">Your Phone</label>
                <div className="field has-addons">
                  <p className="control">
                    <a className="button is-static">+44</a>
                  </p>
                  <p className="control is-expanded">
                    <input
                      className="input"
                      type="tel"
                      placeholder="Your phone number"
                    />
                  </p>
                </div>
              </div>
              <div className="field">
                <label className="checkbox">
                  <input type="checkbox" onClick={() => setMembers(!members)} />
                  Registering as a family?
                </label>
              </div>
              <AnimatePresence initial={false}>
                {members && (
                  <div className="pb-3 ml-5">
                    <motion.section
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <p>
                        <i>
                          Add any other members of your family below, please
                          note the person entered above will be the account
                          holder.
                        </i>
                      </p>
                      {family.map((member, index) => (
                        <div className="field-body pb-2">
                          <div className="field">
                            <label className="label">First Name</label>
                            <div className="control">
                              <input
                                className="input"
                                type="text"
                                placeholder="John"
                              />
                            </div>
                          </div>
                          <div className="field">
                            <label className="label">Last Name</label>
                            <div className="control">
                              <input
                                className="input"
                                type="text"
                                placeholder="Smith"
                              />
                            </div>
                          </div>
                          <div className="field">
                            <label className="label">Age</label>
                            <div className="control">
                              <input className="input" type="numbers" />
                            </div>
                          </div>

                          <a
                            className="button is-danger"
                            style={{ alignSelf: "flex-end" }}
                            onClick={() => deleteFamilyMember(index)}
                          >
                            Delete
                          </a>
                        </div>
                      ))}
                      <a className="button is-info" onClick={addFamilyMember}>
                        Add Member
                      </a>
                    </motion.section>
                  </div>
                )}
              </AnimatePresence>

              <button className="button is-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default register;
