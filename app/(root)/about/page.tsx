import React from "react";

const AboutPage = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await response.json();
  console.log("Fetched Data:", data);

  return <div>{data.id}</div>;
};

export default AboutPage;
