const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");

const http = require("../services/httpService");
const dbURL = config.get("dbEndpoint") + "/plan";

const userSubscriptionArray = [
  {
    email: "himaja.chandaluri@gmail.com",
    startDate: "1 May 2021",
    endDate: "30 May 2021",
    amount: "$20",
    paymentType: "Credit Card",
    tag: "current",
  },
  {
    email: "himaja.chandaluri@gmail.com",
    startDate: "1 Apr 2021",
    endDate: "30 Apr 2021",
    amount: "$20",
    paymentType: "Credit Card",
    tag: "past",
  },
  {
    email: "himaja.chandaluri@gmail.com",
    startDate: "1 Mar 2021",
    endDate: "31 Mar 2021",
    amount: "$20",
    paymentType: "Debit Card",
    tag: "past",
  },
  {
    email: "himaja.chandaluri@gmail.com",
    startDate: "1 Feb 2021",
    endDate: "28 Feb 2021",
    amount: "$20",
    paymentType: "Credit Card",
    tag: "past",
  },
  {
    email: "himaja.chandaluri@gmail.com",
    startDate: "1 Jan 2021",
    endDate: "31 Jan 2021",
    amount: "$20",
    paymentType: "Paypal",
    tag: "past",
  },
];

class UserSubscription {
  static async getMySubscriptions(email) {
    const result = {};

    const { data: future } = await http.get(dbURL + "/search?", {
      params: {
        email: email,
        tag: "future",
      },
    });
    result.future = future;

    const { data: current } = await http.get(dbURL + "/search?", {
      params: {
        email: email,
        tag: "current",
      },
    });
    result.current = current;

    const { data: past } = await http.get(dbURL + "/search?", {
      params: {
        email: email,
        tag: "past",
      },
    });
    result.past = past;

    return result;

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     console.log("In 'getMySubscriptions()', EMAIL: ", email);
    //     const result = {};
    //     result.future = [];
    //     result.current = [];
    //     result.past = [];
    //     userSubscriptionArray
    //       .filter((userSubscription) => userSubscription.email == email)
    //       .map((userSubscription) => {
    //         if (userSubscription.tag == "future") {
    //           result.future.push(userSubscription);
    //         } else if (userSubscription.tag == "current") {
    //           result.current.push(userSubscription);
    //         } else {
    //           result.past.push(userSubscription);
    //         }
    //       });
    //     // console.log(result);
    //     resolve(result);
    //   }, 300);
    // });
  }

  static async addNewSubscription(subscription) {
    const { status } = await http.post(dbURL + "/add", {
      email: subscription.email,
      startdate: subscription.startDate,
      enddate: subscription.endDate,
      amount: subscription.amount,
      paymenttype: subscription.paymentType,
      tag: subscription.tag || "future",
    });
    console.log("status: ", status);
    if (status == 200) {
      return subscription;
    } else {
      return 200;
    }
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const userSubscription = {
    //       email: subscription.email,
    //       startDate: subscription.startDate,
    //       endDate: subscription.endDate,
    //       amount: subscription.amount,
    //       paymentType: subscription.paymentType,
    //       tag: subscription.tag || "future",
    //     };
    //     userSubscriptionArray.push(userSubscription);
    //     console.log("PUSHED: ", userSubscriptionArray);
    //     resolve(userSubscription);
    //   }, 300);
    // });
  }

  static validate(user) {
    console.log("USER", user);
    const schema = Joi.object({
      email: Joi.string().required().email(),
      startDate: Joi.string().required(),
      endDate: Joi.string().required(),
      amount: Joi.number().required(),
      paymentType: Joi.string().required(),
      tag: Joi.string(),
    });
    return schema.validate(user);
  }
}

module.exports.UserSubscription = UserSubscription;
