const { task } = require("zenaton")

module.exports = task("SendEmailWithSendgridTemplate", async function ({ email, subject, template_id, template_data }) {
  const sendgrid = this.connector("sendgrid", process.env.ZENATON_SENDGRID_CONNECTOR_ID)

  const params = {
    body: {
      personalizations: [
        {
          to: [{ email: email }],
          dynamic_template_data: { ...template_data, subject }
        }
      ],
      from: { name: 'Team Zenaton', email: 'hey@zenaton.com' },
      template_id: template_id
    }
  }

  await sendgrid.post("/mail/send", params)
})