import React, { Component } from "react";
import withCardView from "./common/withCardView";
import CustomPieChart from "./common/pieChart";
import { getAVStateAndCount } from "../services/avService";

class StatesOfConnectedAVs extends Component {
  state = {};

  color = ["#E38627", "#C13C37", "#6A2135"];

  // data = [
  //   { title: "One", value: 10, color: "#E38627", state: "active" },
  //   { title: "Two", value: 15, color: "#C13C37", state: "inactive" },
  //   {
  //     title: "Three",
  //     value: 20,
  //     color: "#6A2135",
  //     state: "connected",
  //   },
  // ];

  // async componentDidMount() {
  //   const { data: avStates } = await getAVStateAndCount();
  //   console.log("AV STATES: ", avStates);
  //   const data = [];
  //   let count = 0;
  //   avStates.map((item) => {
  //     data.push({
  //       state: item.state,
  //       value: item.count,
  //       color: this.color[count],
  //     });
  //     count += 1;
  //   });
  //   this.setState({ data });
  // }

  render() {
    return (
      <React.Fragment>
        <h1> States of connected AVs</h1>
        <div
          className="dropdown-divider"
          style={{
            marginBottom: "30px",
            borderBlockColor: "#BEE5F0",
          }}
        ></div>
        <div style={{ height: "250px" }}>
          <CustomPieChart data={this.props.data} label="state"></CustomPieChart>
        </div>
      </React.Fragment>
    );
  }
}

export default withCardView(StatesOfConnectedAVs);
