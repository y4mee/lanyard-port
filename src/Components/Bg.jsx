import React from "react";

const Bg = () => {
  return (
    <>
    <div className="fixed w-full h-full -z-10">
      <img
        src="/bground.jpg"
        alt="Background"
        className="w-full h-full object-fit   contrast-125 saturate-80"
      />
    </div>
  </>
  );
};

export default Bg;
