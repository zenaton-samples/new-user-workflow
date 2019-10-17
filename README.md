# New User Activation Emails: 
### Wait for events and trigger emails:

Here is a sample Zenaton project that triggers emails within a web app when the user completes installation and running their first workflow.  Our example is based on a Zenaton new user journey but can easily be configured to send emails and trigger actions based on any events within an app or external services.

## Workflow Logic

When a new user registers, we start a new "NewUserWorkflow" instance for that user. 

This workflow will wait for events and trigger actions - including emails - when the events happen. The workflow can run for days, months or even longer if the events happen much later.

![Workflow chart](/doc/images/flowchart.png)

In our sample web_app, we send 2 events to our workflow to trigger activities (`installation`, and `activation`).  

We use several Zenaton functions in our workflow such as 'wait for event' and 'wait for duration' and connectors to manage the authentication for Sendgrid and Airtable.  

The github repository is split into two directories:

- **[web_app](/web_app)**: a simple NodeJS web app where we launch the workflow instance per user when they register and send events when the user installs or runs their first workflow.
- **[worker](/worker)**: Runs the workflow and tasks and receives the events for each workflow instance.

## Web_App UI for testing

We've provided a simple UI in the web_app that allows you to simulate the user events (`installation` or `activation`) to trigger actions in the workflow and see the corresponding tasks executions on your Zenaton dashboard:

![Sample we_app and Zenaton dashboard](/doc/images/web-app-dashboard.png)

# Requirements:

- A [Zenaton](https://app.zenaton.com) account (its free!)
- An API key from [Sendgrid](https://app.sendgrid.com/settings/api_keys), to connect Zenaton to Sendgrid. Show our [guide](/doc/create-sendgrid-account.md)
- Optional: An AirTable [ApiKey](https://airtable.com/api) (only if you use airtable to modify email content)

## Basic Workflow Version: Send a email based on user actions within your app

- Set up your SendGrid api connector on the Zenaton dashboard using our [guide](/doc/setup-sendgrid-connector.md).
- Fork the repo so that you can easily change the variables and logic within the workflow and see the impact.  
- deploy it using this button [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy) or choose one of our [deployment options](#other-options-to-deploy-your-project)


Then you can start to use it:
- Click on 'Register' to simulate signup which launches the workflow.
- Click on the 'installation' and 'activation' buttons to simulate sending events to the workflow.


Feel free to play around and test the different scenarios.

Note: you can also change the 'wait' duration to 5 seconds to speed up your experience.

## Other Workflow Versions

Here are a few other examples to send emails with conditional content.

### Sendgrid Template with conditional blocks

To run this example, you will need to setup a dynamic template inside Sendgrid.
Here is our [guide](/doc/create-dynamic-template.md)

### Hybrid: Modify the email content from an AirTable database

To run this example, you will need to
- [import an AirTable base](/doc/create-airtable-table.md)
- [get the API key](/doc/get-airtable-api-key.md) of this new base
- setup a [Zenaton connector](/doc/setup-airtable-connector.md) for the airtable API

## Other options to deploy your project

If you want to take it to the next level and customize your workflow, here are a few ways to install and run it on your own dev environments:  

- Run on your local environment using docker or by installing Zenaton on your computer

- Run on your servers [(View the Zenaton Docs)](https://zenaton.com/documentation/node/going-to-production/#intro)

### Run locally

To get started we will install the agent and start the web_app and agent.  

#### Start the web_app

```
git clone https://github.com/zenaton/new-user-workflow.git
cd new-user-workflow/web_app
cp .env.sample .env
```

Fill the `.env` file. Note that some environment variables are optional.

Start the web_app
```
yarn run start
```

#### Start the agent

If you do not have the agent already installed
```
curl https://install.zenaton.com | sh
```

Then
```
cd worker
cp .env.sample .env
zenaton start
zenaton listen --boot=boot.js
```

### Run with Docker

```
git clone https://github.com/zenaton/new-user-workflow.git
cd new-user-workflow/web_app
cp .env.sample .env
```

```
cd ../worker
cp .env.sample .env
```

Fill the `.env` files. Note that some environment variables are optional.

Start docker
```
docker-compose up
```
