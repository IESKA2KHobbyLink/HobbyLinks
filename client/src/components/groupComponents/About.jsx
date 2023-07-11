import React from "react";

function About({ desc }) {
  return (
    <div className="my-4 mx-5">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="font-normal text-lg">{desc}</p>
    </div>
  );
}

export default About;
