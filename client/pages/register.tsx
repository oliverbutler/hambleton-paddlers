import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PasswordField from "components/Input/PasswordField";

const register = () => {
  const [members, setMembers] = useState(true);
  const [family, setFamily] = useState([{}]);

  const addFamilyMember = () => {
    setFamily([...family, {}]);
  };

  const onChangeMember = (index, property, value) => {
    let fam = [...family];
    fam[index][property] = value;
    setFamily(fam);
  };

  const deleteFamilyMember = (index) => {
    var fam = [...family];
    fam.splice(index, 1);
    setFamily(fam);
  };

  return (
    <div className="container my-5">
      <div className="content">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
            <li>View upcoming events</li>
            <li>Submit forms for upcoming events</li>
          </ul>
          <p>
            Once your request has being submitted we will look over the request
            before contacting you directly at your given email
          </p>
          <h1 className="title is-4 pt-5">Your Information</h1>
          <div className="columns mt-4">
            <div className="column">
              <form>
                <div className="field-body">
                  <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="John"
                        onChange={(e) =>
                          onChangeMember(0, "given_name", e.target.value)
                        }
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
                        onChange={(e) =>
                          onChangeMember(0, "family_name", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Date of Birth</label>
                    <div className="control">
                      <input
                        className="input"
                        type="date"
                        onChange={(e) =>
                          onChangeMember(0, "date_of_birth", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      placeholder="johnsmith@gmail.com"
                    />
                  </div>
                </div>

                <h1 className="title is-4 pt-5">Your Contact Information</h1>

                <div className="field-body">
                  <div className="field is-expanded">
                    <label className="label">Mobile Phone</label>
                    <p className="control is-expanded">
                      <input
                        className="input"
                        type="tel"
                        placeholder="Your phone number"
                      />
                    </p>
                  </div>
                  <div className="field is-expanded">
                    <label className="label">Home Phone</label>
                    <p className="control is-expanded">
                      <input
                        className="input"
                        type="tel"
                        placeholder="Your phone number"
                      />
                    </p>
                  </div>
                </div>
                <h1 className="title is-4 pt-5">Member Details</h1>

                <p>
                  <i>
                    Add any other members of your family below, the first in
                    this list is you, the account holder
                  </i>
                </p>

                <p>
                  For the purpose of carrying out a comprehensive risk
                  assessment, all applicants MUST disclose details of any
                  disability, special needs or illness that could increase the
                  risk to both themselves and those helping them in relation to
                  water based activities. This information will be used to
                  identify training and equipment needs and to establish safety
                  protocols to ensure both you and any designated helpers can
                  participate in a safe environment
                </p>
                <div>
                  {family.map((member, index) => (
                    <div
                      key={`member-${index}`}
                      className="mt-5 pl-3"
                      style={{ borderLeft: "5px solid lightgrey" }}
                    >
                      <div className="field-body pb-2">
                        <div className="field">
                          <label className="label">First Name</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="John"
                              value={member["given_name"]}
                              onChange={(e) =>
                                onChangeMember(
                                  index,
                                  "given_name",
                                  e.target.value
                                )
                              }
                              disabled={index == 0}
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
                              value={member["family_name"]}
                              onChange={(e) =>
                                onChangeMember(
                                  index,
                                  "family_name",
                                  e.target.value
                                )
                              }
                              disabled={index == 0}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label className="label">Date of Birth</label>
                          <div className="control">
                            <input
                              className="input"
                              type="date"
                              value={member["date_of_birth"]}
                              disabled={index == 0}
                              onChange={(e) =>
                                onChangeMember(
                                  index,
                                  "date_of_birth",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="field-body mt-2">
                        <div className="field is-narrow">
                          <div className="label">
                            BCU Member ID (if applicable){" "}
                          </div>
                          <div className="control">
                            <input
                              type="text"
                              className="input"
                              value={member["bcu_member_id"]}
                              onChange={(e) =>
                                onChangeMember(
                                  index,
                                  "bcu_member_id",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="field is-narrow">
                          <label className="label">Kayaking</label>
                          <div className="control">
                            <div className="select">
                              <select
                                value={member["kayaking_ability"]}
                                onChange={(e) =>
                                  onChangeMember(
                                    index,
                                    "kayaking_ability",
                                    e.target.value
                                  )
                                }
                              >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="field is-narrow">
                          <label className="label ">Canoeing</label>
                          <div className="control">
                            <div className="select">
                              <select
                                value={member["canoeing_ability"]}
                                onChange={(e) =>
                                  onChangeMember(
                                    index,
                                    "canoeing_ability",
                                    e.target.value
                                  )
                                }
                              >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="field">
                          <div className="label">Swim 25m</div>
                          <div className="control">
                            <input
                              type="checkbox"
                              className="checkbox"
                              value={member["swim_25"]}
                              onChange={(e) =>
                                onChangeMember(index, "swim_25", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="field-body mt-2">
                        <div className="field">
                          <div className="label">Allergies</div>
                          <div className="control">
                            <textarea
                              className="textarea"
                              value={member["allergies"]}
                              onChange={(e) =>
                                onChangeMember(
                                  index,
                                  "allergies",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="field">
                          <div className="label">Disabilities</div>
                          <div className="control">
                            <textarea
                              className="textarea"
                              value={member["disabilities"]}
                              onChange={(e) =>
                                onChangeMember(
                                  index,
                                  "disabilities",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="field">
                          <div className="label">Other Medical Info</div>
                          <div className="control">
                            <textarea
                              className="textarea"
                              value={member["other_medical"]}
                              onChange={(e) =>
                                onChangeMember(
                                  index,
                                  "other_medical",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <button
                          className="button is-danger"
                          style={{ alignSelf: "flex-end" }}
                          onClick={(e) => {
                            e.preventDefault();
                            deleteFamilyMember(index);
                          }}
                          disabled={index == 0}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  <a className="button is-info mt-5" onClick={addFamilyMember}>
                    Add Family Member
                  </a>
                </div>

                <h1 className="title is-4">Account Details</h1>

                <PasswordField label="Create account Password" />

                <h1 className="title is-4">Declaration</h1>

                <ol>
                  <li>
                    I consent that I am aged 16 or over and that all information
                    provided is correct to the best of my knowledge.
                  </li>
                  <li>
                    I agree to abide by the Club’s Rules and Regulations
                    (available on the website).
                  </li>
                  <li>
                    I confirm that I have disclosed details of any allergy,
                    disability, special need or illness that requires special
                    consideration in terms of equipment, the use of equipment,
                    the planning of events and supervision while participating
                    in such events, in the interest of my own personal safety
                    and the safety of others.
                  </li>
                  <li>
                    I understand that the activities I may participate in will
                    expose me to many hazards and involve the risk of property
                    damage and loss and even personal injury, illness or death.
                    Whilst Hambleton Paddlers Canoe Club will take all
                    reasonable steps to ensure my safety, I understand that they
                    cannot be held liable for my own actions, for which I must
                    take responsibility, or for those of a third party.
                  </li>

                  <li>
                    I consent that my email address will receive important
                    account and club updates, and any marketing preferences may
                    be modified in "My Profile".
                  </li>
                  <li>
                    I agree that all personal data provided will be stored{" "}
                    <b>sole use</b> of Hambleton Paddlers Canoe Club. The data
                    will be deleted once you leave the club or request for the
                    data to be removed. As to comply with GDPR you may also
                    request access to any and all data we hold against you,
                    please contact us at{" "}
                    <a href="mailto:hambletonpaddlers02@gmail.com">
                      hambletonpaddlers02@gmail.com
                    </a>
                  </li>
                  <li>
                    I consent that any violation of these conditions, or misuse
                    of the account may lead to membership and account
                    revocation.
                  </li>
                </ol>
                <div className="field">
                  <label className="checkbox">
                    <input type="checkbox" /> I agree to the above terms and
                    conditions
                  </label>
                </div>

                <button className="button is-primary mt-5">Submit</button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default register;
