<template>
  <div>
    <h1 class="text-sm">Send basic email</h1>
    <p class="pt-2 pb-4">Send text email using sendgrid.</p>
    <Simulator workflow_name="NewUserWorkflow" />
  </div>
</template>

<script>
export default {
  name: "SendgridBasic"
};
</script>

<script>
import Simulator from "../components/Simulator.vue";

export default {
  name: "SendgridBasic",
  components: {
    Simulator
  }
};
</script>