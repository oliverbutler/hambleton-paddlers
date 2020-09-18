import React from "react";
import CommitteeMembers from "../components/CommitteeMembers";

const commitee_members = ({ content }) => {
  return (
    <main className="container my-5">
      <h1 className="title">Our Committee</h1>
      <CommitteeMembers content={content} />
    </main>
  );
};

export default commitee_members;

export const getStaticProps = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/committee");
  var content = [];
  try {
    content = await res.json();
  } catch (err) {
    console.log("Server error");
  }

  return {
    props: {
      content,
    },
    revalidate: 1,
  };
};
