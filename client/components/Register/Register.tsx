import React, { useEffect, useRef, useState } from "react";
import PasswordField from "components/Input/PasswordField";
import Input from "components/Input";
import { useForm, useFieldArray } from "react-hook-form";
import { Types } from "components/Input/Input";
import { getAge, getToast } from "utils/functions";
import { getInstance } from "utils/axios";
import _ from "lodash";
import Router from "next/router";

const Register = () => {
  const { register, handleSubmit, errors, control } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "members",
    }
  );

  useEffect(() => {
    if (fields.length == 0) append({});
  }, []);

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

  const is16 = (dateOfBirth) => {
    if (getAge(dateOfBirth) < 16) return "Must be 16 or older";
    else return true;
  };

  const onSubmit = (data) => {
    data.username = data.email;

    getInstance()
      .post("/auth/local/register", data, { timeout: 5000 })
      .then((res) => {
        console.log(res);
        getToast().fire({
          icon: "success",
          title: "Account successfully created!",
        });
        Router.push("/login");
      })
      .catch((err) => {
        getToast().fire({
          icon: "error",
          title: _.get(err, "response.data.message[0].messages[0].message"),
        });
      });
  };

  return (
    <div>
      <h1 className="title is-4 pt-5">Your Information</h1>
      <div className="columns mt-4">
        <div className="column">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              type={Types.email}
              name="email"
              register={register({ required: true })}
              errors={errors}
              placeholder="johnsmith@gmail.com"
            />
            <div className="field-body">
              <Input
                label="Mobile Phone"
                type={Types.tel}
                name="mobile_phone"
                register={register({
                  required: true,
                })}
                errors={errors}
                placeholder="07911 123456"
              />

              <Input
                label="Home Phone"
                type={Types.tel}
                name="home_phone"
                register={register}
                errors={errors}
                placeholder="01845 123456"
              />
            </div>

            <h1 className="title is-4 pt-5">Member Details</h1>

            <p>
              <i>
                Add any other members of your family below, the first in this
                list is you, the account holder
              </i>
            </p>

            <p>
              For the purpose of carrying out a comprehensive risk assessment,
              all applicants MUST disclose details of any disability, special
              needs or illness that could increase the risk to both themselves
              and those helping them in relation to water based activities. This
              information will be used to identify training and equipment needs
              and to establish safety protocols to ensure both you and any
              designated helpers can participate in a safe environment
            </p>
            <div>
              {fields.map((member, index) => (
                <div
                  key={`member-${index}`}
                  className="mt-5 pl-3"
                  style={{ borderLeft: "5px solid lightgrey" }}
                >
                  <div className="field-body pb-2">
                    <Input
                      label="First Name"
                      name={`members[${index}].given_name`}
                      register={register({
                        required: true,
                      })}
                      errors={errors}
                      placeholder="John"
                    />
                    <Input
                      label="Last Name"
                      name={`members[${index}].family_name`}
                      register={register({ required: true })}
                      errors={errors}
                      placeholder="Smith"
                    />
                    <Input
                      label="Date of Birth"
                      type={Types.date}
                      name={`members[${index}].date_of_birth`}
                      errors={errors}
                      register={register({
                        required: true,
                        validate: is16,
                      })}
                    />
                  </div>

                  <div className="field-body mt-2">
                    <Input
                      label="Allergies"
                      name={`members[${index}].allergies`}
                      register={register}
                      type={Types.textarea}
                    />
                    <Input
                      label="Disabilities"
                      name={`members[${index}].disabilities`}
                      register={register}
                      type={Types.textarea}
                    />
                    <Input
                      label="Other Medical Info"
                      name={`members[${index}].other_medical`}
                      register={register}
                      type={Types.textarea}
                    />
                  </div>
                  <div className="field-body mt-2">
                    <Input
                      label="BCU Member ID (if applicable)"
                      name={`members[${index}].bcu_member_id`}
                      register={register}
                      narrow
                    />
                    <Input
                      label="Kayaking"
                      select={["Beginner", "Intermediate", "Advanced"]}
                      name={`members[${index}].kayaking_level`}
                      register={register({ required: true })}
                      errors={errors}
                      narrow
                    />
                    <Input
                      label="Canoeing"
                      select={["Beginner", "Intermediate", "Advanced"]}
                      name={`members[${index}].canoeing_level`}
                      register={register({ required: true })}
                      errors={errors}
                      narrow
                    />
                    <Input
                      label="Swim 25m"
                      type={Types.checkbox}
                      name={`members[${index}].can_swim_25`}
                      register={register}
                      narrow
                    />
                    <Input
                      label="Photo Consent"
                      type={Types.checkbox}
                      name={`members[${index}].photo_concent`}
                      register={register}
                      help="See the data protection form"
                    />
                    <button
                      className="button is-danger"
                      style={{ alignSelf: "flex-end" }}
                      onClick={() => remove(index)}
                      disabled={index == 0}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <a className="button is-info mt-5" onClick={() => append({})}>
                Add Family Member
              </a>
            </div>

            <h1 className="title is-4">Account Details</h1>

            <PasswordField
              label="Create account Password"
              register={register}
              errors={errors}
            />

            <h1 className="title is-4">Terms and Conditions</h1>

            <ol>
              <li>
                I consent that I am aged 16 or over and that all information
                provided is correct to the best of my knowledge.
              </li>
              <li>
                I agree to abide by the Club’s Rules and Regulations (available
                on the website).
              </li>
              <li>
                I confirm that I have disclosed details of any allergy,
                disability, special need or illness that requires special
                consideration in terms of equipment, the use of equipment, the
                planning of events and supervision while participating in such
                events, in the interest of my own personal safety and the safety
                of others.
              </li>
              <li>
                I understand that the activities I may participate in will
                expose me to many hazards and involve the risk of property
                damage and loss and even personal injury, illness or death.
                Whilst Hambleton Paddlers Canoe Club will take all reasonable
                steps to ensure my safety, I understand that they cannot be held
                liable for my own actions, for which I must take responsibility,
                or for those of a third party.
              </li>

              <li>
                I consent that my email address will receive important account
                and club updates, and any marketing preferences may be modified
                in "My Profile".
              </li>
              <li>
                I understand and gree that all personal data provided will be
                stored <b>sole use</b> of Hambleton Paddlers Canoe Club. The
                data will be deleted once you leave the club or request for the
                data to be removed. As to comply with GDPR you may also request
                access to any and all data we hold against you, please contact
                us at{" "}
                <a href="mailto:hambletonpaddlers02@gmail.com">
                  hambletonpaddlers02@gmail.com
                </a>
              </li>
              <li>
                I consent that any violation of these conditions, or misuse of
                the account may lead to membership and account revocation.
              </li>
            </ol>
            <Input
              type={Types.checkbox}
              name="signed_tos"
              label="I agree to the above terms and conditions"
              register={register({
                required: {
                  value: true,
                  message: "You must agree to the tos to progress",
                },
              })}
              errors={errors}
            />

            <button className="button is-primary mt-5" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
