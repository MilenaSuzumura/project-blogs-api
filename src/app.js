const express = require('express');

// ...

const app = express();

app.use(express.json());

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
const loginRouter = require('./routes/login.route');
const userRouter = require('./routes/user.route');
const categoriesRouter = require('./routes/categories.route');
const postRouter = require('./routes/post.route');

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);
module.exports = app;
