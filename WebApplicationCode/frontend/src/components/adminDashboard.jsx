import React, { Component } from "react";
import NumberOfAVUsers from "./numberOfAVUsers";
import NumberOfConnectedAVs from "./numberOfConnectedAVs";
import ConnectedAVDetails from "./connectedAVDetails";
import StatesOfConnectedAVs from "./statesOfConnectedAVs";

class AdminDashboard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1 className="text-center" style={{ marginBottom: "25px" }}>
          AdminDashboard
        </h1>
        <div className="row" style={{ margin: "0px" }}>
          <div className="col-auto">
            <NumberOfAVUsers
              style={{
                margin: "30px 10px",
                float: "left",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            ></NumberOfAVUsers>
          </div>
          <div className="col-auto">
            <NumberOfConnectedAVs
              style={{
                margin: "30px 10px",
                float: "right",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            ></NumberOfConnectedAVs>
          </div>
        </div>
        <ConnectedAVDetails></ConnectedAVDetails>
        {/* <div className="row" style={{ margin: "0px" }}>
          <div className="col-12">
            <StatesOfConnectedAVs
              style={{
                margin: "30px 10px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            ></StatesOfConnectedAVs>
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
