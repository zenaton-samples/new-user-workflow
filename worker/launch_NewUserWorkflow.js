const { run } = require("./client");

const user = {
    name: 'John Doe',
    email: 'you@foo.com',
    lang: 'node',
    did_tutorial: false
};

run.workflow("NewUserWorkflow", user);