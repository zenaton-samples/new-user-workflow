const { task } = require("zenaton")

module.exports = task("GetTemplateBlocksFromAirTable", async function () {
  // connect to AirTable API
  const airtable = this.connector("airtable", process.env.ZENATON_AIRTABLE_CONNECTOR_ID)

  // Get blocks of text from AirTable
  const records = await airtable.get(process.env.AIRTABLE_TABLE_NAME, {
    headers: {
      base_id: process.env.AIRTABLE_BASE_ID
    },
    query: { view: "Grid view"}
  })
  
  // Transform raw AirTable data to an easy to use format
  // output: {
  //   block_did_tutorial: '...',
  //   block_not_did_tutorial: '...'
  // }
  const blocks = records.data.records.reduce((acc,x) => {
    return {...acc, [x.fields.block_name]: x.fields.block_content}
  }, {})

  return blocks
})