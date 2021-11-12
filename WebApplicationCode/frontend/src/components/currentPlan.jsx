import React, { Component } from "react";
import withCardView from "./common/withCardView";

class CurrentPlan extends Component {
  state = {};
  render() {
    const { data: currentPlan } = this.props;
    // console.log("CURRENT PLAN : ", currentPlan);
    return (
      <React.Fragment>
        <h1> Current Plan</h1>
        <div
          className="dropdown-divider"
          style={{
            marginBottom: "30px",
            borderBlockColor: "#BEE5F0",
          }}
        ></div>
        {currentPlan &&
          currentPlan.length > 0 &&
          currentPlan.map((plan) => (
            <React.Fragment key={plan.startdate + plan.enddate}>
              <p>
                <strong>Current Cycle: </strong> {plan.startdate} -{" "}
                {plan.enddate}
              </p>
              <p>
                <strong>Amount: </strong>
                {plan.amount}
              </p>
              <p>
                <strong>Payment Type: </strong>
                {plan.paymenttype}
              </p>
            </React.Fragment>
          ))}
        {currentPlan && currentPlan.length === 0 && (
          <p> No active current plan at the moment</p>
        )}
      </React.Fragment>
    );
  }
}

export default withCardView(CurrentPlan);
