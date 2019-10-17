"use strict";
const { workflow, duration } = require('zenaton')

module.exports = workflow('NewUserWorkflow_basicEmail', function* (user) {
  // Wait a maximum of 1 month the user does the installation. (We will use 30 sec in dev)
  const installation_event = yield this.wait.event("installation").for(duration.seconds(30))
  if (null === installation_event) {
    // The user have not installed the agent within 1 month.
    // Send an email to encourage the user to do the tutorial.
    yield this.run.task('SendEmailWithSendgrid', {
      email: user.email, subject: 'What are the next steps ?', content: 'Have you seen our tutorial ?'
    })
  } else {
    // Once the user installed the agent. Wait a maximum of 20 minutes the user do the activation (We will use 20 sec in dev)
    const activation_event = yield this.wait.event('activation').for(duration.seconds(20))
    if (null === activation_event) {
      // The user did not do the activation within 20 minutes.

      // Send an email to propose some help.
      yield this.run.task('SendEmailWithSendgrid', {
        email: user.email, subject: 'Need some help ?', content: 'TDB'
      })
    } else {
      // The user installed the agent and did the activation.
      yield this.wait.for(duration.seconds(3)) // (We will use 3 sec in dev)
      // Send an email to congratulate the user and give him resources for real examples.
      yield this.run.task('SendEmailWithSendgrid', {
        email: user.email, subject: 'What are the next steps ?', content: 'Look at our real-world example ...'
      })
    }
  }
})