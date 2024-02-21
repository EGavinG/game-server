const express = require('express');
const knex = require('../knex');
const knexConfig = require('./Knexfile')
const app = express();
const cors = require('cors') 
const PORT = process.env.PORT || 3001

const db = knex(knexConfig['development']);

app.locals.title = 'Game Server';
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Game Server Online~');
});


app.get('/api/v1/highscores', async (request, response) => {
  try {
    const highScores = await db('highscores').select('*');
    response.json({ highScores });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/api/v1/highscores', async (request, response) => {
  try {
    const { initials, techTamer, wins } = request.body;
    const insertedScore = await db('highscores').insert({ initials, techTamer, wins });
    response.status(201).json({ id: insertedScore[0], initials, techTamer, wins });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Failed to add high score' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
