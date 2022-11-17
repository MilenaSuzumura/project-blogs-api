const express = require('express');

// ...

const app = express();

app.use(express.json());

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
const loginRouter = require('./routes/login.route');
const userRouter = require('./routes/user.route');

app.use('/login', loginRouter);
app.use('/user', userRouter);
module.exports = app;
