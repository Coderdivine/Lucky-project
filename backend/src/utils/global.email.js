// const path = require('path');
// const expressHandlebars = require('express-handlebars');

// const exphbs = expressHandlebars.create({
//   defaultLayout: 'main',
//   layoutsDir: path.join(__dirname, '/templates'),
// });

// function generateEmail(templateName, data) {
//   const filePath = __dirname + '/templates' + `/${templateName}.hbs`;
//   console.log({ filePath });
//   return exphbs.render(filePath, data);
// }

// module.exports = {
//   generateEmail
// };

// generateEmail("content", {});

const path = require('path');
const expressHandlebars = require('express-handlebars');
const exphbs = expressHandlebars.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, '../utils/'), // Go up one level to the parent directory and then to 'templates'
});

function generateEmail(templateName, data) {
  const filePath = path.join(__dirname, '../utils/', `${templateName}.hbs`); // Go up one level to the parent directory and then to 'utils/templates'
  console.log({ filePath });
  return exphbs.render(filePath, data);
}

module.exports = {
  generateEmail
};

