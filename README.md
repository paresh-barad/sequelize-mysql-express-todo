## Create custom Login, Register and crud of todo API using Express, Sequelize and Mysql2

If you think this source code is useful, it will be great if you just give it star.

# Quick Start

**Clone the repository**<br/>
`git clone https://github.com/paresh-barad/sequelize-mysql-express-todo.git`

**Go inside the directory**<br/>
`cd sequelize-mysql-express-todo/`

**Install dependencies**<br/>
`npm install`

**Start server**<br/>
`node server.js`

# Database jwt Configration for server
Global variables such as mysql host, user, password and database can be set in `config/db.config.js`

**Restful API**<br/>
An api with the following routes
```
POST    /api/user
POST    /api/user/login

POST    /api/todo
GET     /api/todo
GET     /api/todo/:id
PUT     /api/todo/:id
DELETE  /api/todo/:id
DELETE  /api/todo
```
