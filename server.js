const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.get('/api/quotes/random', (req, res) => {
    res.send({
        quote: getRandomElement(quotes)
    });
})

app.get('/api/quotes/', (req, res) => {
    if (req.query.person) {

        const personQuotes = quotes.filter((quote) => {
            return quote.person === req.query.person
        });
        res.send({
            quotes: personQuotes
        })
    } else {
        res.send({
            quotes
        })
    }
})

app.post('/api/quotes', (req, res) => {
    if (req.query.person && req.query.quote) {
        const newQuote = {
            person: req.query.person,
            quote: req.query.quote
        }
        quotes.push(newQuote);
        res.status(201).send({quote: newQuote});
    } else {
        res.status(400).send('Invalid parameters')
    }
})

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})

