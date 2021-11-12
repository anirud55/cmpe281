import React, { Component } from "react";
import withCardView from "./common/withCardView";

class FuturePlan extends Component {
  state = {};
  render() {
    const { data: futurePlans } = this.props;

    return (
      <React.Fragment>
        <h1> Future Plans</h1>
        {futurePlans &&
          futurePlans.length > 0 &&
          futurePlans.map((plan) => (
            <React.Fragment>
              <div
                className="dropdown-divider"
                style={{
                  marginTop: "30px",
                  marginBottom: "30px",
                  borderBlockColor: "#BEE5F0",
                }}
              ></div>
              <p>
                <strong>Future Cycle: </strong> {plan.startdate} -{" "}
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
        {futurePlans && futurePlans.length === 0 && (
          <React.Fragment>
            <div
              className="dropdown-divider"
              style={{
                marginBottom: "30px",
                borderBlockColor: "#BEE5F0",
              }}
            ></div>
            <p> No future plans at the moment</p>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withCardView(FuturePlan);
