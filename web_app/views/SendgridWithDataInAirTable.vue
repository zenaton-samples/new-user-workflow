<template>
  <div>
    <h1 class="text-sm">Edit text in Airtable</h1>
    <p class="pt-2 pb-4">Edit the email content in AirTable</p>
    <Simulator workflow_name="NewUserWorkflow_dataInAirTable" />
  </div>
</template>

<script>
export default {
  name: "SendgridWithDataInAirTable"
};
</script>

<script>
import Simulator from "../components/Simulator.vue";

export default {
  name: "SendgridWithDataInAirTable",
  components: {
    Simulator
  }
};
</script>