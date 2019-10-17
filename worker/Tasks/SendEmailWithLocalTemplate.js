const { task } = require("zenaton")
const { compile_local_template, compile_string_template } = require("../lib/templating")

module.exports = task("SendEmailWithLocalTemplate", async function ({ email, subject, template_file, template_data, template_blocks }) {
  // connect to sendgrid and AirTable APIs
  const sendgrid = this.connector("sendgrid", process.env.ZENATON_SENDGRID_CONNECTOR_ID)

  const template_context = {...template_blocks, ...template_data, ...subject}

  // compile template 
  const template = compile_local_template(template_file, template_context)

  // second pass of compiling template, because the airtable blocks may contains some templating logic
  const html = compile_string_template(template, template_context)

  // Send the email
  const params = {
    body: {
      personalizations: [
        {
          to: [{ email }],
        }
      ],
      content: [{ type: 'text/html', value: html }],
      subject: subject,
      from: { name: 'Team Zenaton', email: 'hey@zenaton.com' },
    }
  }

  await sendgrid.post("/mail/send", params)
})