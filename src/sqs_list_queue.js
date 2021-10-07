const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const AWS = require("aws-sdk");

// Set the aws
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const params = {};

sqs.listQueues(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrls);
  }
});
