var express = require('express');
var router = express.Router();

const database = require('../db/dbService')

/**
 * GET /
 *
 * Checks whether the user is logged in.
 * If not logged in, retrieves most recent messages from the database and returns them (public timeline).
 * If logged in, retrieves most recent messages (follower and own) from the database and returns them.
 * 
 * Errors:
 *  - 500: An error occurred while retrieving the message
 */


// TODO: Switch to "personal" timeline if logged in. Currently only shows public timeline. 
router.get('/', function(req, res, next) {
    database.all("select message.*, user.* from message, user \
                where message.flagged = 0 \
                and message.author_id = user.user_id \
                order by message.pub_date desc limit 30"
    , [], (err, rows) => {
      console.log(rows);

    if (err) {
      console.error(err);
      res.status(500).render('error');
      return;
    }

    var d = new Date((rows[0].pub_date)*1000);
    console.log("HALLOHALLIHERERDENJKSHDKJAHLKJDH: " + d);
    
    console.log('Successfully retrieved ' + rows.length + ' messages');
    res.render('index', { title: 'MiniTwit', messages: rows });
    });



});


module.exports = router;