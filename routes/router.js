const express = require('express');
const appRouter = express.Router();

const authenticationRouter = require('./authentication');
const studentRouter = require('./student');
appRouter.use(authenticationRouter);
appRouter.use(studentRouter);
module.exports = appRouter;