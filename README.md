# Backend-API
Backend API in Nodejs Express CRUD

How to run:
Make sure you already install node, npm and mongodb service in your machine before install and run the application.

Recommended:
Yarn version: 1 and up.
Node version: 16 and up.
NPM version: 8 and up.

1. yarn install
2. yarn start
3. create .env.dev

put info below in .env.dev
NODE_ENV=development
PORT=5001
DB_USER=<database username>
DB_PASSWORD=<database user password>
DB_NAME=<database name>
ADMIN_DB_NAME=<database admin name>
DB_SERVERS="<database username>:<database user password>@localhost:27017"
CORS_ORIGIN="localhost:27017"

TOKEN_KEY=<create your own token key for test purposes only>
TOKEN_XPRY=15m
