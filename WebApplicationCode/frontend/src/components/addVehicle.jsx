import React, { Component } from "react";
import auth from "../services/authService";
import Joi from "joi-browser";
import Form from "./common/form";
import { Redirect } from "react-router";
import { addVehicle } from "../services/userService";
import { getSubscriptionData } from "../services/userService";

const user = auth.getCurrentUser();

class AddVehicle extends Form {
    state = {
    data: { vId: "", vColor: "", vMake: "", vModel: "", vMileage: "", vPspace: "", vLocation: "",},
    errors: {},
  };

  schema = {
    vId: Joi.string().required().label("Vehicle ID"),
    vColor: Joi.string().regex(RegExp(/^[a-zA-Z ]+$/)).required().label("Vehicle Color"),
    vMake: Joi.string().regex(RegExp(/^[a-zA-Z ]+$/)).required().label("Vehicle Make"),
    vModel: Joi.string().required().label("Vehicle Model"),
    vMileage: Joi.number().integer().min(0).max(200000).label("Vehicle Mileage"),
    vPspace: Joi.number().integer().min(0).max(8).label("Vehicle Passenger Space"),
    // vServiceStatus: Joi.string().regex(RegExp(/^[a-zA-Z ]+$/)).required().label("Vehicle Service Status"),
    // vCurrentStatus: Joi.string().regex(RegExp(/^[a-zA-Z ]+$/)).required().label("Vehicle Current Status"),
    vLocation: Joi.string().required().label("Vehicle Current Location"),
    // vRoadService: Joi.string().regex(RegExp(/^[a-zA-Z ]+$/)).required().label("Vehicle Road Service"),
  };
  // adding
  doSubmit = async () => {

    try{
      console.log("Submitted");
      const { vId, vColor, vMake, vModel, vMileage, vPspace, vCurrentStatus, vServiceStatus,
        vLocation, vRoadService, } = this.state.data;
      // const { paymentType } = this.state.data;
      const vehicleData = {
        vId,
        vColor,
        vMake,
        vModel,
        vMileage,
        vPspace,
        vServiceStatus,
        vCurrentStatus,
        vLocation,
        vRoadService,
      };
      vehicleData.vCurrentStatus = "Idle";
      const { data: planDetails } = await getSubscriptionData();
      console.log("DATA: ", planDetails);
      if (planDetails.current.length == 0)
      {
        vehicleData.vServiceStatus = "Inactive";
      }
      else{
        vehicleData.vServiceStatus = "Active";
      }
      vehicleData.vRoadService = "No Service";

      console.log(this.state.data);
      console.log("Submitted1");
      console.log(vehicleData);
      console.log("Submitted2");

      await addVehicle(vehicleData);
      this.props.history.push("/myVehicles");
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("CAUGHT HERE");
        const errors = this.state.errors;
        errors.vId = ex.response.data;
        this.setState({ errors });
      }
    }

  };


  render() {
    // const user = auth.getCurrentUser();
    return(
        <React.Fragment>
        <div>
             <h1 className="text-center" style={{ marginBottom: "25px" }}>
          Add a Vehicle</h1>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("vId", "VID")}
            {this.renderInput("vColor", "Vehicle Color")}
            {this.renderInput("vMake", "Vehicle Make")}
            {this.renderInput("vModel", "Vehicle Model")}
            {this.renderInput("vMileage", "Vehicle Mileage")}
            {this.renderInput("vPspace", "Vehicle Passengers Space")}
            {/* {this.renderInput("vServiceStatus", "Vehicle Service Status (Moving or Idle)")}
            {this.renderInput("vCurrentStatus", "Vehicle Current Status (Active or Inactive)")} */}
            {this.renderInput("vLocation", "Vehicle Location (City)")}
            {/* {this.renderInput("vRoadService", "Vehicle Road Service (Service required or No Service)")} */}
            {this.renderButton("Submit")}
          </form>
        </div>
        </React.Fragment>
        );
       
    }
}

export default AddVehicle;