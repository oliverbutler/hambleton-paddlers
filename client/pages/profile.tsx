import React, { useEffect } from "react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";

const profile = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) Router.push("/login");
  }, [currentUser]);

  return (
    <div>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </div>
  );
};

export default profile;
