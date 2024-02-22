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
    knex.select().from('highscores').then((highscores) => {
        res.send(highscores)
    })
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

app.listen('3001', () => {
    console.log(`Server started at port 3001`)
})