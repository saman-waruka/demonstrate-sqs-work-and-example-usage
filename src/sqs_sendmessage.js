const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
console.log({ env: process.env });
// Set the aws
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const params = {
  // Remove DelaySeconds parameter and value for FIFO queues
  // DelaySeconds: 10,
  MessageAttributes: {
    Title: {
      DataType: "String",
      StringValue: "The Whistler",
    },
    Author: {
      DataType: "String",
      StringValue: "John Grisham",
    },
    WeeksOn: {
      DataType: "Number",
      StringValue: "6",
    },
  },
  MessageBody: `Information about current NY Times fiction bestseller for week of ${new Date()}`,
  MessageDeduplicationId: "TheWhistler", // Required for FIFO queues
  MessageGroupId: "Group2", // Required for FIFO queues
  QueueUrl: process.env.SQS_QUEUE_URL,
};

sqs.sendMessage(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});
