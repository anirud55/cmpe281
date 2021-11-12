import React, { Component } from "react";
import withCardView from "./common/withCardView";
import Table from "./common/table";

import { getJwt } from "../services/authService";
import { getAvStates } from "../services/avService";

import _ from "lodash";

// import { io } from "socket.io-client";
// const socket = io("http://localhost:3900", {
//   query: {
//     jwtToken: getJwt(),
//   },
// });


class CurrentState extends Component {
    state = { current: "active",
      };

      columns = [
        { path: "state", label: "Status" },
      ];

// componentDidMount() {
//     //this.populateAVStatusAndCountData();
//     this.populateAVStatusListData();
//     socket.on("avStateUpdated", this.reRenderAV);
//   }

//   async populateAVStatusAndCountData() {
//     console.log("In data");
//     const { data: avStates } = await getAvStates();
//     console.log("AV STATES: ", avStates);
//     const avStatusDistributionData = [];
//     avStates.map((item) => {
//       avStatusDistributionData.push({
//         vId: item.vId,  
//         state: item.state,
//       });
//     });
//     this.setState({ avStatusDistributionData });
//     console.log("populated Count data");
// }
// async populateAVStatusListData() {
//     const { data: avStatus } = await getAvStates();
//     console.log("LIST DATA: ", avStatus);
//     // this.setState({ avStatus });
//     const avStatusDistributionData= [];
//     avStatus.map((item) => {
//         avStatusDistributionData.push({
//           state: item.state,
//         });
//     });
//     this.setState({ avStatusDistributionData });
//   }

//   reRenderAV = (data) => {
//     const avStates = this.state.avStatusDistributionData;
//     // _.remove(avStates, (avStatus) => {
//     //     return avStatus.number == data.number;
//     //   });
//     console.log("SOCKET INCOMING DATA: ", data);
//     avStates.push(data);
//     // this.setState({ avStates });
//     console.log("Populating count data");
//     //this.populateAVStatusAndCountData();
//   };


//   async componentDidMount() {
//     const { data: userCount } = await getUserCount();
//     this.setState({ userCount: userCount.count });
//   }

  render() {
    return (
      <React.Fragment>
        <h1>Current State</h1>
        <div
          className="dropdown-divider"
          style={{
            marginTop: "5px",
            marginBottom: "5px",
            borderBlockColor: "#BEE5F0",
          }}
        ></div>
        <p className="text-center" style={{ fontSize: "50px" }}>
        {this.props.data}
        </p>
        {!this.props.data && (
           <p className="text-center" style={{ fontSize: "50px" }}>
           Idle
           </p>
        )}
      </React.Fragment>
    );
  }
}

export default withCardView(CurrentState);