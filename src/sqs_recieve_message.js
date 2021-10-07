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

const queueURL = process.env.SQS_QUEUE_URL;

const params = {
  AttributeNames: ["s"],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ["s"],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
};

sqs.receiveMessage(params, function (err, data) {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    console.log(" data ========================>  ");
    console.log(data.Messages);
    const deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle,
    };
    sqs.deleteMessage(deleteParams, function (err, data) {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Message Deleted", data);
      }
    });
  }
});
