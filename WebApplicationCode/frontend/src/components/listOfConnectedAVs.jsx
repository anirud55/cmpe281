import React, { Component } from "react";

import withCardView from "./common/withCardView";
import Table from "./common/table";

class ListOfConnectedAVs extends Component {
  state = {};

  columns = [
    { path: "vid", label: "AV Number" },
    { path: "email", label: "AV Owner" },
    { path: "vmake", label: "AV Make" },
    { path: "vmodel", label: "AV Model" },
    { path: "vmileage", label: "AV Mileage" },
    { path: "roadservice", label: "Road Service" },
    { path: "vcurrentstatus", label: "AV State" },
  ];

  render() {
    return (
      <React.Fragment>
        <h1>List of connected AVs</h1>
        <div
          className="dropdown-divider"
          style={{
            marginBottom: "30px",
            borderBlockColor: "#BEE5F0",
          }}
        ></div>
        <Table
          data={this.props.data}
          columns={this.columns}
          keyAtt="number"
        ></Table>
      </React.Fragment>
    );
  }
}

export default withCardView(ListOfConnectedAVs);
