module.exports.handle = function* (user) {
  // Wait a maximum of 1 month the user does the installation.
  const installation_event = yield this.wait.event("installation").for(1*process.env.INSTALLATION_WAIT_DURATION)

  // If the user have not installed the agent
  if (!installation_event) {
    // Send an email to encourage the user to do the tutorial.
    yield this.run.task('SendEmailWithSendgrid', {
      email: user.email,
      subject: 'What are the next steps ?',
      content: 'Have you seen our tutorial ?'
    })
    // workflow ends
    return;
  } 

  // Once the user installed the agent. Wait user activation
  const activation_event = yield this.wait.event('activation').for(1*process.env.ACTIVATION_WAIT_DURATION)

  // If the user did not activate
  if (!activation_event) {
    // Send an email to propose some help.
    yield this.run.task('SendEmailWithSendgrid', {
      email: user.email,
      subject: 'Need some help ?',
      content: 'TDB'
    })
    // workflow ends
    return;
  } 

  // Send an email to congratulate the user and give him resources for real examples.
  yield this.run.task('SendEmailWithSendgrid', {
    email: user.email,
    subject: 'What are the next steps ?',
    content: 'Look at our real-world example ...'
  })
  // workflow ends
  return;
}