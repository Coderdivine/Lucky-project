require("express-async-errors");
const path = require('path');
const express = require("express");
const app = require("express")();

const expressHandlebars = require('express-handlebars');
const exphbs = expressHandlebars.create({ defaultLayout: 'main', layoutsDir: path.join(__dirname, 'utils/templates') });

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'utils/templates'));
app.use(express.static('utils/templates'));
const rateLimit = require('express-rate-limit');
app.set('trust proxy', false);




require("./middlewares/pre-route.middleware")(app);


//app.use((req, res, next) => setTimeout(next, 5000));

app.use(require("./routes"));

require("./middlewares/error.middleware")(app);

const PORT = process.env.PORT || 5005;

app.listen(PORT, async () => {
    require("./database/mongo");
    console.log(`:::> Server listening on port ${PORT} @ http://localhost:${PORT}`);
});

app.on("error", (error) => {
    console.error(`<::: An error occurred on the server: \n ${error}`);
});

module.exports = app;
