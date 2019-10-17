<template>
  <nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <router-link to="/"><span class="font-semibold text-xl tracking-tight">WebApp</span></router-link>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <router-link
          class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
          to="/examples/sendgrid-basic"
        ><b>Ex 1</b><br/>Send basic email</router-link>
        <router-link
          class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
          to="/examples/sendgrid-dynamic-template"
        ><b>Ex 2</b><br/>Use dynamic template</router-link>
        <router-link
          class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
          to="/examples/sendgrid-with-data-in-airtable"
        ><b>Ex 3</b><br/>Edit text in Airtable</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
a.router-link-active {
  color: white;
}
</style>
