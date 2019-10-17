# Get AirTable API key

Go to [https://airtable.com/](https://airtable.com)

Choose your database, then click to "HELP", than to "API documentation".
![help > API documentation](/doc/images/airtable-api-key-1.png)

Go to the "List records" section, make sure the "show api key" is check the top right.

![API key in the documentation](/doc/images/airtable-api-key-2.png)

So from here you will get two important credentials:

- appXXXXXXXXXXXXXX which is your base_id that you will name `AIRTABLE_BASE_ID`
- keyXXXXXXXXXXXXXXX which is your API key, that you will put into your [connector](https://app.zenaton.com/connectors) settings

Note: The `AIRTABLE_BASE_ID` credential need to be added in your `worker/.env` file or add it as an environment variable inside heroku depending on the deployment method you use.

![API key in the documentation](/doc/images/airtable-connector.png)
