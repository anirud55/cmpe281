import React, { Component } from "react";
import Table from "./common/table";
import { getRides } from "../services/userService";
import auth from "../services/authService";
import { Link } from "react-router-dom";

const user = auth.getCurrentUser();
// let user1 = user.name.slice(0,1).toUpperCase() + user.name.slice(1,user.name.length);
let user1 = "";
if (user != null) {
    user1 = user.name.slice(0, 1).toUpperCase() + user.name.slice(1, user.name.length);
}

class MyRides extends Component {
    state = {vId: "", Origin: "", vPspace: "", Destination: "", Date: ""};

    columns = [
        { path: "vid", label: "Vehicle License Plate #" },
        { path: "origin", label: "Origin Location" },
        { path: "passengers", label: "Vehicle Passenger Space" },
        { path: "destination", label: "Destintaion Location" },
        { path: "vdatetime", label: "Date/Time" },
      ];

      async componentDidMount() {
        const { data: rides } = await getRides();
        console.log("Made it: ", rides);
        const data1 = [];
        // vechiles.map((item) => {
        //     data1.push({g
        //       vId: item.vId,
        //       vColor: item.vColor,
        //       vMake: item.vMake,
        //     });
        // });
        this.setState({rides});
        console.log(this.state.rides);
    }

    render() {

        const {rides} = this.state;
        // console.log(y);
        return (
            
            <React.Fragment>
                <div>
                    <h1 className="text-center" style={{ marginBottom: "25px" }}>
                        {user1 + "'s Ride History"}</h1>
                </div>
                <Link
                    className="btn btn-info"
                    to={{
                        pathname: "/mySchedule",
                    }}
                >Schedule a Ride</Link>
                <p></p>
                <Table data={rides} columns={this.columns} keyAtt="vdatetime" ></Table>
                
            </React.Fragment>
        );
    }
}

export default MyRides;