import React, { Component } from "react";
import _ from "lodash";

import StatesOfConnectedAVs from "./statesOfConnectedAVs";
import ListOfConnectedAVs from "./listOfConnectedAVs";

import { getAVStateAndCount, getListOfAVs } from "../services/avService";
import { getJwt } from "../services/authService";
import { socket } from "../App";

// import { io } from "socket.io-client";
// const socket = io("http://localhost:3900", {
//   query: {
//     jwtToken: getJwt(),
//   },
// });

class ConnectedAVDetails extends Component {
  state = {
    avStatusDistributionData: [],
    avStatusList: [],
  };

  color = ["#E38627", "#C13C37", "#6A2135"];

  componentDidMount() {
    this.populateAVStatusAndCountData();
    this.populateAVStatusListData();
    socket.on("avStatusUpdated", this.reRenderAVList);
  }

  async populateAVStatusAndCountData() {
    console.log("In populate Count data");
    const { data: avStates } = await getAVStateAndCount();
    console.log("AV STATES: ", avStates);
    const avStatusDistributionData = [];
    let count = 0;
    avStates.map((item) => {
      avStatusDistributionData.push({
        state: item.state,
        value: item.count,
        color: this.color[count],
      });
      count += 1;
    });
    this.setState({ avStatusDistributionData });
    console.log("populated Count data");
  }

  async populateAVStatusListData() {
    const { data: avStatusList } = await getListOfAVs();
    console.log("LIST DATA: ", avStatusList);
    this.setState({ avStatusList });
  }

  reRenderAVList = (data) => {
    const avStatusList = this.state.avStatusList;

    const index = _.findIndex(avStatusList, (avStatus) => {
      return avStatus.vid == data.vid;
    });
    // _.remove(avStatusList, (avStatus) => {
    //   return avStatus.vid == data.vid;
    // });

    console.log("INDEX: ", index);
    if (index >= 0) {
      const record = avStatusList[index];
      _.remove(avStatusList, (avStatus) => {
        return avStatus.vid == data.vid;
      });
      record.vcurrentstatus = data.vcurrentstatus;
      avStatusList.unshift(record);
    }
    this.setState({ avStatusList });
    console.log("SOCKET INCOMING DATA: ", data);
    console.log("AVStatusList: ", avStatusList);
    // avStatusList.unshift(data);
    // console.log("AVStatusList: ", avStatusList);
    // this.setState({ avStatusList });
    // console.log("Populating count data");
    // this.populateAVStatusAndCountData();
  };

  render() {
    return (
      <React.Fragment>
        <div className="row" style={{ margin: "0px" }}>
          <div className="col-12">
            <StatesOfConnectedAVs
              style={{
                margin: "30px 10px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
              data={this.state.avStatusDistributionData}
            ></StatesOfConnectedAVs>
          </div>
        </div>
        <div className="row" style={{ margin: "0px" }}>
          <div className="col-12">
            <ListOfConnectedAVs
              style={{
                margin: "30px 10px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
              data={this.state.avStatusList}
            ></ListOfConnectedAVs>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ConnectedAVDetails;
