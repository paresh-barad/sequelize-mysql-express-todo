const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


let corsOption = {
	origin: 'http://localhost:8081'
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(customAuthMiddleware);

const db = require('./app/models');
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log("Drop and re-sync db.");
// });
require('./app/routes/todo.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});