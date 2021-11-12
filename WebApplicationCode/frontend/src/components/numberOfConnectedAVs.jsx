import React, { Component } from "react";
import withCardView from "./common/withCardView";
import { getAVCount } from "../services/avService";

class NumberOfConnectedAVs extends Component {
  state = {};

  async componentDidMount() {
    const { data: avCount } = await getAVCount();
    this.setState({ avCount: avCount.count });
  }

  render() {
    return (
      <React.Fragment>
        <h1> Number Of Connected AVs</h1>
        <div
          className="dropdown-divider"
          style={{
            marginBottom: "30px",
            borderBlockColor: "#BEE5F0",
          }}
        ></div>
        <p className="text-center" style={{ fontSize: "50px" }}>
          {this.state.avCount}
        </p>
      </React.Fragment>
    );
  }
}

export default withCardView(NumberOfConnectedAVs);
