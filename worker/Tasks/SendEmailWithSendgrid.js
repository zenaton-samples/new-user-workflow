const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async function ({ email, subject, content }) {
  const msg = {
    to: [{ email }],
    from: { name: 'Team Zenaton', email: 'hey@zenaton.com' },
    subject,
    html: content,
  };
  sgMail.send(msg);
}