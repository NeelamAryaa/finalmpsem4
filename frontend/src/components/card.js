import React from "react";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div className="card w-75 mx-auto my-5 text-start shadow bg-white rounded">
      <h5 className="card-header text-white" style={{ background: "#8a8b8c" }}>
        Mock Test - 1
      </h5>
      <div className="card-body">
        <h5 className="card-title">Your score : 480</h5>
        <div className="card-text w-50 d-flex justify-content-between">
          <div>Questions : 120</div>
          <div>Marks : 480</div>
          <div>Time : 120 mintues</div>
        </div>
        <Link to="/instruction">
          <div className="btn btn-primary mt-3">Start Test</div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
