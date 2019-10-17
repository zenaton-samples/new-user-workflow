# Create a dynamic template in Sendgrid

Go to https://sendgrid.com/dynamic_templates, then click the "Create Template" button.

Then type a name, here we choose "onboarding_next_step", then click "save"

![Create a dynamic template](/doc/images/dynamic_template_1.png)

So you get there:

![Add a version](/doc/images/dynamic_template_2.png)

Where you will click the "Add version" button.

Make sure to choose "Code editor", then click on "Continue"

![Select Code editor](/doc/images/dynamic_template_3.png)

Copy this snippet in the "Test data" tab:
```json
{
  "name": "Antoine",
  "agent_installed": true,
  "subject": "What are the next steps ?"
}
```
![Add some test data](/doc/images/dynamic_template_test_data.png)

Then copy this snippet to the "Code" tab:
```html
<p>Hi {{ name }},</p>

{{#if agent_installed }}
Look at our real-world example ...
{{else}}
Have you seen our tutorial ?
{{/if}}
```
![Paste the mail template](/doc/images/dynamic_template_code.png)

Last settings, click on the "Settings", on the left bar to setup the mail template name and the subject.
![Set the subject as variable](/doc/images/dynamic_template_settings.png)
