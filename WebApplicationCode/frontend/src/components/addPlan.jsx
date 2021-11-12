import React, { Component } from "react";
import Form from "./common/form";
import { addNewSubscription } from "../services/userService";
import Joi from "joi-browser";

class AddPlan extends Form {
  state = {
    startDate: "",
    endDate: "",
    tag: "",
    data: { paymentType: "" },
    errors: {},
  };

  schema = {
    paymentType: Joi.string().required().label("Payment Type"),
  };

  month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  componentDidMount() {
    const { futurePlans, currentPlan } = this.props.location.state;
    let tag;
    let startDate;
    let endDate;
    if (futurePlans && futurePlans.length > 0) {
      console.log("endDate: ", futurePlans[0].enddate);
      const { start, end } = this.calculateStartAndEndDate(
        futurePlans[0].enddate
      );
      startDate = start;
      endDate = end;
      tag = "future";
    } else if (currentPlan && currentPlan.length > 0) {
      console.log("endDateC: ", currentPlan[0].enddate);
      const { start, end } = this.calculateStartAndEndDate(
        currentPlan[0].enddate
      );
      startDate = start;
      endDate = end;
      tag = "future";
    } else {
      const { start, end } = this.calculateStartAndEndDate(Date.now());
      startDate = start;
      endDate = end;
      tag = "current";
    }

    startDate = this.convertDateToRequiredformat(startDate);
    endDate = this.convertDateToRequiredformat(endDate);

    this.setState({ startDate, endDate, tag });
  }

  doSubmit = async () => {
    console.log("Submitted");
    const { startDate, endDate, tag } = this.state;
    const { paymentType } = this.state.data;
    const subscriptionData = {
      startDate,
      endDate,
      paymentType,
      tag,
      amount: 20,
    };
    console.log("subscriptionData: ", subscriptionData);
    await addNewSubscription(subscriptionData);
    this.props.history.push("/myPlan");
  };

  onPaymentTypeChange = ({ target }) => {
    const { data } = this.state;
    data.paymentType = target.value;
    this.setState({ data });
  };

  calculateStartAndEndDate(date) {
    const nextPlanStartdate = new Date(date);
    nextPlanStartdate.setDate(nextPlanStartdate.getDate() + 1);

    const nextPlanEnddate = new Date(nextPlanStartdate);
    nextPlanEnddate.setDate(nextPlanEnddate.getDate() + 28);

    return { start: nextPlanStartdate, end: nextPlanEnddate };
  }

  convertDateToRequiredformat(date) {
    console.log();
    return (
      date.getDate() +
      " " +
      this.month[date.getMonth()] +
      " " +
      date.getFullYear()
    );
  }

  render() {
    return (
      <React.Fragment>
        <h1> Add Plan</h1>

        <p style={{ fontSize: "25px", marginTop: "50px" }}>
          <strong>Cycle: </strong> {this.state.startDate} - {this.state.endDate}
        </p>
        <p style={{ fontSize: "25px", marginTop: "30px" }}>
          <strong>Amount: </strong> $20
        </p>
        <form onSubmit={this.handleSubmit} style={{ fontSize: "20px" }}>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            {this.renderRadioOptions("paymentType", "Credit Card", "radio")}
            {this.renderRadioOptions("paymentType", "Debit Card", "radio")}
            {this.renderRadioOptions("paymentType", "PayPal", "radio")}
          </div>
          {this.renderButton("Add Plan")}
        </form>
      </React.Fragment>
    );
  }
}

export default AddPlan;

{
  /* <div className="form-check">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                value="Credit Card"
                onChange={this.onPaymentTypeChange}
                name="paymentType"
              ></input>
              Credit Card
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                value="Debit Card"
                onChange={this.onPaymentTypeChange}
                name="paymentType"
              ></input>
              Debit Card
            </label>
          </div> */
}
