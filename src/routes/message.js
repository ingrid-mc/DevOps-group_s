var express = require('express');
var router = express.Router();

const database = require('../db/dbService')

/**
 * GET /message
 *
 * Retrieves all messages from the database and returns them as a JSON response.
 *
 * Response:
 *  - messages: An array of message objects, where each object has the following properties:
 *    - message_id: The message's unique identifier
 *    - author_id: The authors's identifier
 *    - text: The message's content
 *    - pub_date: The message's publication date
 *    - flagged: A boolean representing if the message is flagged or not
 *  Response example:
 *    {"message_id":1,"author_id":1,"text":"From hour to hour yesterday I saw my white face of it?","pub_date":1233065594,"flagged":0}
 *
 * Errors:
 *  - 500: An error occurred while retrieving the message
 */
router.get('/', async function(req, res, next) {
  database.all("SELECT * FROM message", [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: 'An error occurred while retrieving  messages', description: err.toString() });
      return;
    }

    console.log('Successfully retrieved ' + rows.length + ' messages');
    res.send({ messages: rows });
  });
  
});


module.exports = router;
