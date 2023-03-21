import React, { Fragment } from "react";
import Card from "../components/card";
import NavBar from "../components/navbar";
// const screenfull = require("screenfull");

const HomePage = () => {
  // useEffect(() => {
  //   if (screenfull.isEnabled) {
  //     screenfull.request();
  //   }
  // });

  return (
    <Fragment>
      <NavBar />
      <div className="bg-light py-4 px-5" style={{ minHeight: "90vh" }}>
        <Card />
        <Card />
        <Card />
      </div>
    </Fragment>
  );
};

export default HomePage;
