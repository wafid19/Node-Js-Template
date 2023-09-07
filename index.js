require('dotenv').config();
const express = require('express')
const app = express()
const body_parser = require('body-parser');
const port = process.env.PORT | 3000;
const router = require('./routes/router');

const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc');
const db = require('./util/db');
app.use(body_parser.json())

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hello World',
            version: '1.0.0',
        },
    },
    apis: ['./routes*.js', 'index.js'], // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(router);

app.listen(port, async () => {
    db.connect((err) => {
        if (err) throw err;
        console.log("database connected");
    })
    console.log(`Server running on http://localhost:${port}`)
})