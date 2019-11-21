const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "A28sensor",
    database : "PlayAlong"
});

function queryHandler(sqlquery) {
    //result = q(con,sqlquery);
    return new Promise((resolve, reject) => {
        con.query(sqlquery, function (err, result, fields) {
            if (err) {
                console.error(err);
                reject(err);
            } else if (result) {
                resolve(result);
            }
        });

    });
}

async function createGameHandler(req, res) {

    // const query = "INSERT INTO " +
    //                " GAMES ( game_type_id, name, date, players_count cost, apt, street, city, " +
    //                " country, zipcode, created_by, created_on, owner_id,required_skill_level_id)"+
    //                " VALUES(1, '"+req.body.name+"','"+req.body.date+"',"+req.body.playerCount+","+req.body.cost+""+
    //                " '"+req.body.apt+"','"+req.body.street+"','"+req.body.city+"','"+req.body.country+"',"+req.body.zipcode+""+
    //                " "+req.body.created_by+",'"+req.body.created_on+"', "+req.body.owner_id+")";
    //
    // await queryHandler(query);

    res.send("create game done");
}

module.exports = {
    createGameHandler: createGameHandler
}

