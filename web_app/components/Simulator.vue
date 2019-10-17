<template>
  <div>
    <!-- RegisterForm -->
    <div class="w-full max-w-md">
      <form @submit="submit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 class="pb-6">#1 Launch Workflow</h2>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            required
            v-model="name"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            required
            v-model="email"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            v-on:click="register"
          >Register</button>
        </div>
      </form>
    </div>

    <!-- SendEventForm -->
    <div class="w-full max-w-md">
      <form @submit="submit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 class="pb-6">#2 Send Event to a Workflow</h2>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >Choose workflow instance</label>
          <div class="inline-block relative w-full">
            <select
              v-model="selected_email"
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option v-bind:key="user.email" v-for="user in users">{{ user.email }}</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between py-6">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            v-on:click="installation"
          >Trigger "installation" event</button>
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            v-on:click="activation"
          >Trigger "activation" event</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Simulator",
  props: {
    workflow_name: String
  },
  data() {
    return { name: "", email: "", selected_email: null, users: [] };
  },
  methods: {
    submit: function(e) {
      e.preventDefault();
    },
    register() {
      console.log(`register ! for ${this.selected_email} -> ${this.workflow_name}`);

      const user = { name: this.name, email: this.email };

      if(!this.users.some(u => u.email === this.email)) {
        this.users.push(user);
      }
      this.selected_email = this.email;

      this.post(`/api/${this.workflow_name}/register`, user);
    },
    installation() {
      console.log(`installation ! for ${this.selected_email} -> ${this.workflow_name}`);

      const payload = {
        user: this.get_current_user(),
        event: {
          name: "installation",
          data: { version: "0.8.1" }
        }
      };
      this.post(`/api/${this.workflow_name}/event`, payload);
    },
    activation() {
      console.log(`activation ! for ${this.selected_email}`);

      const payload = {
        user: this.get_current_user(),
        event: {
          name: "activation",
          data: { foo: "bar" } // put custom data in here if needed.
        }
      };
      this.post(`/api/${this.workflow_name}/event`, payload);
    },
    post(url, payload) {
      fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    },
    get_current_user() {
      return this.users.find(user => user.email === this.selected_email)
    }
  }
};
</script>
