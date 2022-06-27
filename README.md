# Backend-API
Backend API in Nodejs Express CRUD
<br />
How to run:<br />
Make sure you already install node, npm and mongodb service in your machine before install and run the application.
<br />
Recommended:<br />
Yarn version: 1 and up.<br />
Node version: 16 and up.<br />
NPM version: 8 and up.<br />
<br />
1. yarn install
2. yarn start
3. create .env.dev
<br />
put info below in .env.dev:<br />
NODE_ENV=development<br />
PORT=5001<br />
DB_USER=<database username><br />
DB_PASSWORD=<database user password><br />
DB_NAME=<database name><br />
ADMIN_DB_NAME=<database admin name><br />
DB_SERVERS="<database username>:<database user password>@localhost:27017"<br />
CORS_ORIGIN="localhost:27017"<br />
<br />
TOKEN_KEY=<create your own token key for test purposes only><br />
TOKEN_XPRY=15m<br />
