import Vue from 'vue'
import Router from 'vue-router'

import SendgridBasic from './views/SendgridBasic.vue'
import SendgridDynamicTemplate from './views/SendgridDynamicTemplate.vue'
import SendgridWithDataInAirTable from './views/SendgridWithDataInAirTable.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: to => {
        return '/examples/sendgrid-basic'
      }
    },
    // Examples
    {
      path: '/examples/sendgrid-basic',
      name: 'example-sendgrid-basic',
      component: SendgridBasic
    },
    {
      path: '/examples/sendgrid-dynamic-template',
      name: 'sendgrid-dynamic-template',
      component: SendgridDynamicTemplate
    },
    {
      path: '/examples/sendgrid-with-data-in-airtable',
      name: 'example-sendgrid-with-data-in-airtable',
      component: SendgridWithDataInAirTable
    }
  ]
})
