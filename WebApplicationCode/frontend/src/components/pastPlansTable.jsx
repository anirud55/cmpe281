import React, { Component } from "react";
import Table from "./common/table";

class PastPlansTable extends Component {
  columns = [
    { path: "startdate", label: "Start Date" },
    { path: "enddate", label: "End Date" },
    { path: "amount", label: "Amount" },
    { path: "paymenttype", label: "Payment Type" },
  ];

  // pastPlans = [
  //   {
  //     _id: 1,
  //     cycle: "1 Apr 2021 - 30 Apr 2021",
  //     amount: "$20",
  //     payment: "Credit Card",
  //   },
  //   {
  //     _id: 2,
  //     cycle: "1 Mar 2021 - 31 Mar 2021",
  //     amount: "$20",
  //     payment: "Credit Card",
  //   },
  //   {
  //     _id: 3,
  //     cycle: "1 Feb 2021 - 28 Feb 2021",
  //     amount: "$20",
  //     payment: "Credit Card",
  //   },
  //   {
  //     _id: 4,
  //     cycle: "1 Jan 2021 - 31 Jan 2021",
  //     amount: "$20",
  //     payment: "Credit Card",
  //   },
  // ];

  render() {
    const { data: pastPlans } = this.props;

    return (
      <Table data={pastPlans} columns={this.columns} keyAtt="startDate"></Table>
    );
  }
}

export default PastPlansTable;
