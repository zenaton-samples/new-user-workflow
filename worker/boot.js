require('dotenv').config()

require("./Workflows/NewUserWorkflow_basicEmail");
require("./Workflows/NewUserWorkflow_dynamicTemplate");
require("./Workflows/NewUserWorkflow_dataInAirTable");

require("./Tasks/SendEmailWithSendgrid");
require("./Tasks/SendEmailWithSendgridTemplate");
require("./Tasks/SendEmailWithLocalTemplate");
require("./Tasks/GetTemplateBlocksFromAirTable");
