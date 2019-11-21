var mysql_helper = require('./mysql_helper');
var dateFormat = require('dateformat');

function createGameHandler(req, res) {
    console.log("checking in");
    var day=dateFormat(new Date(), "yyyy-mm-dd");
    const query = `INSERT INTO GAMES ( game_type_id, name, date, players_count ,cost, apt, street,
         city, country, zipcode, created_by, created_on, owner_id, required_skill_level_id) VALUES ?`;
    const values = [[[req.body.game_type_id, req.body.name, req.body.date, req.body.playerCount, req.body.cost * 100,
                      req.body.apt, req.body.street, req.body.city, req.body.country, req.body.zipcode,
                      req.body.created_by, day,req.body.owner_id , 1]]];
    mysql_helper.executeQuery(query, values).then((result) => {
        res.send("Success");
    });
}


module.exports = {
    createGameHandler: createGameHandler
}