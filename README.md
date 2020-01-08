# New User Activation Emails: 
### Wait for events and trigger emails:

Here is a sample Zenaton project that waits for events within a web app and triggers personalized emails to our users when they complete each milestone (Installation and Activation).  Our example is based on a Zenaton new user journey but can easily be configured to send emails and trigger actions based on any event within an app or in external services.

## Workflow Logic

When a new user registers, we start a new "NewUserWorkflow" instance for that user. 

This workflow will wait for events and trigger actions - including emails - when the events happen. The workflow can run for days, months or even longer if the events happen much later.

![Workflow chart](/doc/images/flowchart.png)

In our sample web app, we send 2 events to our workflow to trigger activities (`installation`, and `activation`).  

We use several Zenaton functions in our workflow such as 'wait for event' and 'wait for duration', as well as connectors, to manage the authentication for SendGrid and AirTable.  

The github repository is split into two directories:

- **[web_app](/web_app)**: a simple NodeJS web app where we launch a workflow instance for each user when they register and send events when the user installs or runs their first workflow.
- **[worker](/worker)**: Runs the workflow and tasks, and receives the events for each workflow instance.

## Web_App UI for testing

We've provided a simple UI in the `web_app` that allows you to simulate the user events (`installation` or `activation`) to trigger actions in the workflow and see the corresponding tasks executions on your Zenaton dashboard:

![Sample we_app and Zenaton dashboard](/doc/images/web-app-dashboard.png)

# Requirements:

- A [Zenaton](https://app.zenaton.com) account (it's free!)
- An API key from [SendGrid](https://app.sendgrid.com/settings/api_keys), to connect Zenaton to SendGrid. See our [guide](/doc/create-sendgrid-account.md)
- Optional: An AirTable [API Key](https://airtable.com/api) (only if you use AirTable to modify email content)

## Basic Workflow Version: Send an email based on user actions within your app

- Set up your SendGrid API connector on the Zenaton dashboard using our [guide](/doc/setup-sendgrid-connector.md).
- Fork the repo so that you can easily change the variables and logic within the workflow and see the impact.  
- Deploy it using this button [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy) or this [link](https://heroku.com/deploy?template=https://github.com/zenaton/new-user-workflow) if the button does not work. We also have other [deployment options](#other-options-to-deploy-your-project)


Then you can start to use it:
- Click on 'Register' to simulate signup, which launches the workflow instance for a user.
- Click on the 'installation' and 'activation' buttons to simulate sending events to the running workflow for that user.


Feel free to play around and test the different scenarios.

Note: you can also change the 'wait' duration to 5 seconds to speed up your testing experience.

## Other Workflow Versions

Here are a few other examples to send emails with conditional content.

### SendGrid Template with conditional blocks

To run this example, you will need to setup a dynamic template inside SendGrid.
Here is our [guide](/doc/create-dynamic-template.md)

### Hybrid: Modify the email content from an AirTable database

To run this example, you will need to
- [import an AirTable base](/doc/create-airtable-table.md)
- [get the API key](/doc/get-airtable-api-key.md) of this new base
- setup a [Zenaton connector](/doc/setup-airtable-connector.md) for the AirTable API

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

Install the dependencies and build the assets
```
yarn && yarn build
```

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
cd ../worker
cp .env.sample .env
yarn
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
