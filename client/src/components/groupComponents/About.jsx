import React, { forwardRef } from "react";

const About = forwardRef(({ desc }, ref) => {
  return (
    <div className="my-4 mx-5" ref={ref}>
      <h1 className="text-3xl font-bold">About</h1>
      <p className="font-normal text-lg">{desc}</p>
    </div>
  );
});

export default About;
