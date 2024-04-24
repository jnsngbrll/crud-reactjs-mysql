const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;
const table = require('./models');
const playerRouter = require('./routes/playerRoute');

app.use(express.json());
app.use(
  cors({
    origin: ['https://crud-reactjs-mysql-admin.vercel.app'],
    methods: ['POST', 'GET'],
    credentials: true,
  })
);

app.get('/', (_, res) => {
  res.send('Hello, World!');
});

// Router
app.use('/players', playerRouter);

table.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`The app is running on http://localhost:${port}`);
  });
});
