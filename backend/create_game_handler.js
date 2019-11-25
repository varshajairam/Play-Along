function createGameHandler(req, res) {
    var mysql_helper = require('./mysql_helper.js');
    var dateFormat = require('dateformat');
    var Gdate = req.body.date;
    var userId = req.user.id ;
    var gameDate = Gdate.split('T')[0];

    var currentDate=dateFormat(new Date(), "yyyy-mm-dd");
    var sql="call playalong.createGame ?;";
    const values = [[[req.body.game_type_id, req.body.name, gameDate, req.body.playerCount, req.body.cost * 100,
        req.body.apt, req.body.street, req.body.city, req.body.country, req.body.zipcode,
        userId, currentDate, userId, req.body.requiredSillLevelId, userId]]];

    mysql_helper.executeQuery(sql, values).then((result) => {
        res.send("Success");
    });
}

module.exports = {
    createGameHandler: createGameHandler
}
