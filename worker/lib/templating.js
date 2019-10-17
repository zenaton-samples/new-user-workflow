const Handlebars = require("handlebars");
const fs = require('fs')
const path = require('path')

const compile_string_template = (template_string, context) => {
  // Compile the template
  const template = Handlebars.compile(template_string);

  // return the HTML
  return template(context);
}

const compile_local_template = (template_name, context) => {
  // load template from filesystem
  const tpl_file = path.resolve(__dirname, `../email_templates/${template_name}.hbs`)
  const template_string = fs.readFileSync(tpl_file, 'utf8')

  // Compile the template, and return the HTML
  return compile_string_template(template_string, context)
}

export { compile_string_template, compile_local_template }