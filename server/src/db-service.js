const low = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ decks: [{ id: 'default', actions: [] }] }).write()

const getDecks = () => db.get('decks').value()

const saveDeck = (deck) =>
  db
    .get('decks')
    .find({ id: deck.id })
    .assign(deck)
    .write()

module.exports = {
  getDecks,
  saveDeck,
}
