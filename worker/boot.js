require('dotenv').config({ path: __dirname + "/.env" });
const { workflow, task } = require("zenaton")

const newUserWorkflow =require("./Workflows/NewUserWorkflow");
const sendEmail = require("./Tasks/SendEmailWithSendgrid");

task("SendEmailWithSendgrid", sendEmail);
workflow('NewUserWorkflow', newUserWorkflow);