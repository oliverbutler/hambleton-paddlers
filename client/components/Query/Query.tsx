import React from "react";
import { useQuery } from "@apollo/react-hooks";

const Query = ({ children, query, id }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <h1>Error</h1>;
  return children({ data });
};

export default Query;
