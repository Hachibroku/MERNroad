require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3000;

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  };

app.use(cors(corsOptions));

app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Working Title',
            version: '1.0.0',
            description: 'A simple Express API',
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerDocument = swaggerJsDoc(swaggerOptions);

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
