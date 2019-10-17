<template>
  <div>
    <h1 class="text-sm">Use dynamic template</h1>
    <p class="pt-2 pb-4">This example leverage the dynamic template feature of Sendgrid.</p>
    <Simulator workflow_name="NewUserWorkflow_dynamicTemplate" />
  </div>
</template>

<script>
export default {
  name: "SendgridDynamicTemplate"
};
</script>

<script>
import Simulator from "../components/Simulator.vue";

export default {
  name: "SendgridDynamicTemplate",
  components: {
    Simulator
  }
};
</script>