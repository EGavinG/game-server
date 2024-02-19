const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Game Server';

app.get('/', (request, response) => {
  response.send('Game Server Online~');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.locals.highScores = [
  { id: '1', initials: 'GAV', techTamer: 'CSCMON', wins: 4, },
  { id: '2', initials: 'MTT', techTamer: 'JSMON', wins: 5, },
  { id: '3', initials: 'FLO', techTamer: 'HTMLMON', wins: 6, }
];

app.get('/api/v1/highscores', (request, response) => {
  const highScores = app.locals.highScores;

  response.json({ highScores });
});

app.get('/api/v1/highscores/:id', (request, response) => {
  const { id } = request.params;
  const highScores = app.locals.highScores.find(score => score.id === id);
  if (!highScores) {
    return response.sendStatus(404);
  }

  response.status(200).json(highScores);
});

app.use(express.json());
app.use(express.static('public'));

app.post('/api/v1/highscores', (request, response) => {
  const id = Date.now();
  const { initials, techTamer, wins } = request.body;

  app.locals.highScores.push({ id, initials, techTamer, wins });

  response.status(201).json({ id, initials, techTamer, wins });
});

app.post('/api/v1/highscores', (request, response) => {
  const id = Date.now();
  const highscore = request.body;

  for (let requiredParameter of ['initials', 'techTamer', 'wins']) {
    if (!highscore[requiredParameter]) {
      response
        .status(422)
        .send({ error: `Expected format: { name: <String>, type: <String> }. You're missing a "${requiredParameter}" property.` });
      return
    }
  }

  const { initials, techTamer, wins } = highscore;
  app.locals.highScores.push({ id, initials, techTamer, wins });
  response.status(201).json({ initials, techTamer, wins });
});



