import React, { Component } from "react";
import CurrentPlan from "./currentPlan";
import PastPlans from "./pastPlans";
import FuturePlan from "./futurePlan";
import { getSubscriptionData } from "../services/userService";
import { Link } from "react-router-dom";
import Button from "./common/button";

class MyPlan extends Component {
  state = {};

  async componentDidMount() {
    const { data: planDetails } = await getSubscriptionData();
    console.log("DATA: ", planDetails);
    this.setState({
      futurePlans: planDetails.future,
      currentPlan: planDetails.current,
      pastPlans: planDetails.past,
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="text-center" style={{ marginBottom: "25px" }}>
          MyPlan
        </h1>
        <Link
          className="btn btn-info"
          to={{
            pathname: "/myPlan/addPlan",
            state: {
              futurePlans: this.state.futurePlans,
              currentPlan: this.state.currentPlan,
            },
          }}
        >
          Add Plan
        </Link>
        <FuturePlan
          style={{ marginTop: "30px" }}
          data={this.state.futurePlans}
        ></FuturePlan>
        <CurrentPlan
          style={{ marginTop: "35px" }}
          data={this.state.currentPlan}
        ></CurrentPlan>
        <PastPlans
          style={{ marginTop: "35px" }}
          data={this.state.pastPlans}
        ></PastPlans>
      </React.Fragment>
    );
  }
}

export default MyPlan;
