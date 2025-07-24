import React from "react";
import Bg from "./Components/Bg";
import Foreground from "./Components/Foreground";
import Container from "./Components/Container";
import Avatar from "./Components/Avatar";

const App = () => {
  return (
    <div className=" font-mono" >
      <Bg />
      <Foreground />
      <div className=" z-[20] ">
        <Container />
        {/* <Avatar /> */}
      </div>
    </div>
  );
};

export default App;
