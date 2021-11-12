import React, { Component } from "react";
import withCardView from "./common/withCardView";
import PastPlansTable from "./pastPlansTable";

class PastPlans extends Component {
  state = {};
  render() {
    const { data: pastPlans } = this.props;

    return (
      <React.Fragment>
        <h1> Past Plans</h1>
        <div
          className="dropdown-divider"
          style={{
            marginBottom: "30px",
            borderBlockColor: "#BEE5F0",
          }}
        ></div>
        <PastPlansTable data={pastPlans}></PastPlansTable>
      </React.Fragment>
    );
  }
}

export default withCardView(PastPlans);
