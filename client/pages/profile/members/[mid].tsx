import Menu from "components/Profile/Menu";
import React from "react";
import { useRouter } from "next/router";
import Member from "components/Profile/Member";
import { useSelector, useDispatch } from "react-redux";

const member = () => {
  const router = useRouter();
  const { mid } = router.query;

  const currentUser = useSelector((state) => state.currentUser);
  const members = currentUser.user.members;

  return (
    <div className="profile-container">
      <Menu active={mid} />
      {members && <Member memberId={mid} />}
    </div>
  );
};

export default member;
