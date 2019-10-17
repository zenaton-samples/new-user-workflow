const { task } = require("zenaton")

module.exports = task("SendEmailWithSendgrid", async function ({ email, subject, content }) {
  const sendgrid = this.connector("sendgrid", process.env.ZENATON_SENDGRID_CONNECTOR_ID)

  const params = {
    body: {
      personalizations: [
        {
          to: [{ email }],
        }
      ],
      content: [{ type: 'text/html', value: content }],
      subject: subject,
      from: { name: 'Team Zenaton', email: 'hey@zenaton.com' },
    }
  }

  await sendgrid.post("/mail/send", params)
})