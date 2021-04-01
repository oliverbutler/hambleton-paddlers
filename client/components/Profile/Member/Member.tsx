import Image from "components/Image";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Member = ({ memberId }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const members = currentUser.user.members;
  const member = members.find((m) => m.id === memberId);

  return (
    <div className="container my-5">
      <div className="content">
        <h1>
          {member.given_name} {member.family_name}
        </h1>
        <div className="image is-128x128">
          <Image image={member.picture} blur key={`image-${member.id}`} />
        </div>
      </div>
    </div>
  );
};

export default Member;
