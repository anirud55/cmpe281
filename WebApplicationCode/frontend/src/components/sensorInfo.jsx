import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import { getJwt } from "../services/authService";
import withCardView from "./common/withCardView";
import { socket } from "../App";

// import { io } from "socket.io-client";
// const socket = io("http://localhost:3900", {
//   query: {
//     jwtToken: getJwt(),
//   },
// });

const avData1 = [
  {
    vC: "1",
    vU: "2",
    vA: "3",
    vB: "3",
    vD: "3",
  },
];

const avData2 = [
  {
    vC: "ON",
    vU: "ON",
    vA: "Activated",
    vB: "32 psi",
    vD: "32 psi",
  },
];

class SensorInfo extends Component {
  state = {
    tailight: "",
    headlight: "",
    temperature: "",
    vid: "",
    gps: "",
  };

  columns = [
    { path: "headlight", label: "Vehicle Headlights" },
    { path: "tailight", label: "Vehicle Taillights" },
    { path: "temperature", label: "Vehicle Temperature" },
    { path: "gps", label: "GPS data" },
    // { path: "vD", label: "Vehicle Left Tire" },
  ];

  componentDidMount() {
    console.log("MADE IT TO SOCKET");
    socket.on("activeSensorInformation", this.reRenderAV);
    console.log("MADE IT PAS SOCKET");
  }

  reRenderAV = (data) => {
    console.log("SOCKET INCOMING DATA: ", data);
    this.setState({
      tailight: data.tailight,
      headlight: data.headlight,
      temperature: data.temperature,
      vid: data.vid,
      gps: data.gps,
    });
    console.log("SET STATE", this.state.tailight);
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="text-center" style={{ marginBottom: "25px" }}>
          Additional Sensor Information
        </h1>
        <div
          className="dropdown-divider"
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            borderBlockColor: "#BEE5F0",
          }}
        ></div>
          <h2  
            style={{
              marginBottom: "50px",
              marginTop: "50px",
              marginLeft: "200px",
              textAlign: "left",
            }}>Vehicle License Plate: {this.state.vid}</h2>
            <div
            className="dropdown-divider"
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              borderBlockColor: "#BEE5F0",
            }}
          ></div>

        <div
          class="sensor"
          style={{
            marginBottom: "50px",
            marginTop: "50px",
            textAlign: "left",
          }}
          ><h2
          style={{
            marginBottom: "50px",
            marginTop: "50px",
            marginLeft: "200px",
          }}
          >Tailight Status: {this.state.tailight}
          </h2>
          <div
            className="dropdown-divider"
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              borderBlockColor: "#BEE5F0",
            }}
          ></div>
          <h2
            style={{
              marginBottom: "50px",
              marginTop: "50px",
              marginLeft: "200px",
              textAlign: "left",
            }}
          >Headlight Status: {this.state.headlight}
          </h2>
          <div
            className="dropdown-divider"
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              borderBlockColor: "#BEE5F0",
            }}
          ></div>
          <h2  
            style={{
              marginBottom: "50px",
              marginTop: "50px",
              marginLeft: "200px",
              textAlign: "left",
            }}>Temperature Status: {this.state.temperature}</h2>
        <div
            className="dropdown-divider"
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              borderBlockColor: "#BEE5F0",
            }}
          ></div>
          <h2  
            style={{
              marginBottom: "50px",
              marginTop: "50px",
              marginLeft: "200px",
              textAlign: "left",
            }}>GPS: {this.state.gps}</h2>
          
        </div>
        
        
        {/* <Table data={this.state.data} columns={this.columns} keyAtt="headlight" ></Table> */}
      </React.Fragment>
    );
  }
}

//export default SensorInfo;

export default withCardView(SensorInfo);
