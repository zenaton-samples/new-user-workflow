'use strict'

var express = require('express')
var bodyParser = require('body-parser')

const client = require("./client")

var app = express()

var config = require('./config')
const PORT = process.env.PORT || config.port

app.use(bodyParser.json())
app.use(express.static(__dirname))
app.listen(PORT)

console.log('App listening on http://localhost:' + PORT)

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname })
})

app.post('/api/:workflow_name/register', function (req, res) {
  console.log(`Register a new user: ${req.body.email}`)
  const user = { ...req.body }

  // Here we launch the 'OnboardingWorkflow' Zenaton Workflow.
  // We pass the user as a parameter to this new workflow instance.
  // the withTag function is used to give the new instance an ID
  // so we will be able later to send event to it.
  client.run.withTag(user.email).workflow(req.params.workflow_name, user)

  res.json()
})

app.post('/api/:workflow_name/event', function (req, res) {
  console.log(`Send the event '${req.body.event.name}' for the user '${req.body.user.email}'`)

  // Send an event to a Zenaton Workflow instance
  client.select
    .workflow(req.params.workflow_name)
    .withTag(req.body.user.email)
    .send(req.body.event.name, req.body.event.data)

  res.json()
})