const express = require('express');
const knex = require('./db/db');
const cors = require('cors') 
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Game Server Online~')
});

app.get('/highscores', (req, res) => {
    console.log("GET request received for /highscores");
    knex.select().from('highscores').then((highscores) => {
        console.log("Retrieved highscores:", highscores);
        res.send(highscores)
    }).catch(error => {
        console.error("Error retrieving highscores:", error);
        res.status(500).json({ error: 'An error occurred while retrieving highscores' });
    });
})

app.post('/highscores', (req, res) => {
    const { initials, character, wins } = req.body;

    knex('highscores').insert({
        initials: initials,
        character: character,
        wins: wins,
    }).then(() => {
        knex.select().from('highscores').then((highscores) => {
            res.send(highscores);
        })
    })
})

app.delete('/highscores/:id', (req, res) => {
  const { id } = req.params;

  knex('highscores')
      .where({ id })
      .del()
      .then(() => {
          res.status(200).json({ message: `High score with ID ${id} has been deleted successfully` });
      })
      .catch(error => {
          console.error('Error deleting high score:', error);
          res.status(500).json({ error: 'An error occurred while deleting the high score' });
      });
});

app.listen('3001', () => {
    console.log(`Server started at port 3001`)
})