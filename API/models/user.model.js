const { stringifyQuery } = require("vue-router");
const sql = require("./db.js");

//We create a constructor
const User = function(user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.pictureUrl = null; //we'll have to add a default picture
    this.rights_id = 1; //every user is created as a base user at first
    this.email = user.email;
    this.password = user.password;
    this.date_created = new Date().toISOString().slice(0, 19).replace('T', ' '); //this code gives us mysql date format
};

//this method adds a newUser object into the database
User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
};

//this method returns a non-deleted user using it's email (which is specified as unique in our table)
User.findByMail = (userMail, result) => {
    sql.query(`SELECT * FROM users WHERE email="${userMail}" AND date_deleted IS NULL`, (err, res) => {
        //if there is an error in the request
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        //We check that we have a not-empty array
        //We also know that the res array will only contain one value at pos res[0]
        if (res.length) {
            result(null, res[0]);
            return;
        }
        //if the request is ok but hasn't found anything.
        result({ kind: "not_found" }, null);
    });
};

//this method returns all the group a user is in
User.getGroups = (userId, result) => {
    //we select all groups (name and group_id) for a given user_id
    const query = `SELECT name, id FROM groups INNER JOIN usergroups on groups.id=usergroups.group_id WHERE usergroups.user_id=${userId}`;
    sql.query(query, (err, res) => {
        //if there is an error in the request
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        //We check that we have a not-empty array
        //We return our array as a resonse
        if (res.length) {
            result(null, res);
            return;
        }
        //if the request is ok but hasn't found anything.
        result({ kind: "not_found" }, null);
    });
};

User.getAllGroups = (result) => {
    //We select all groups that the user could join
    const query = `SELECT groups.name, groups.id FROM groups`
    sql.query(query, (err, res) => {
        //if there is an error in the request
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        //We check that we have a not-empty array
        //We return our array as a response
        if (res.length) {
            result(null, res);
            return;
        }
    })
};

User.isInGroup = (userId, groupId, result) => {
    //we check if a user is in a given group
    const query = `SELECT * FROM usergroups WHERE user_id=${userId} AND group_id=${groupId}`
    sql.query(query, (err, res) => {
        //if there is an error in the request
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            //if there is a match
            result(null, res)
            return;
        } else {
            //if there is no match
            result(null, 0)
            return;
        }
    });
};

User.joinGroup = (userId, groupId, result) => {
    //We add the userId and groupId to the usergroups table
    const query = `INSERT INTO usergroups (user_id, group_id) VALUES(${userId}, ${groupId})`
    sql.query(query, (err, res) => {
        //if there is an error in the request
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        //otherwise everything is fine
        result(null, res);
    });
};

User.quitGroup = (userId, groupId, result) => {
    //We delete the userId and groupId combo from the usergroups table
    const query = `DELETE FROM usergroups WHERE user_id=${userId} AND group_id=${groupId}`
    sql.query(query, (err, res) => {
        //if there is an error in the request
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        //otherwise everything is fine
        result(null, res);
    });
};

User.delete = (userId, result) => {
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    //we don't remove users from the DB, we remove user data from the database. This way we can let people access posts of "deleted" users, without keeping actual user info.
    //to do this we simply add a date of deletion and override userdata
    const query = `UPDATE users SET firstname=" ", lastname="Profile supprimé", pictureUrl="images/default_profile_picture.jpg", rights_id="1", email="anonyme", date_deleted='${timestamp}' WHERE users.id=${userId}`
    sql.query(query, (err, res) => {
        //if there is an error in the request
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("deleted user");
        result(null, res);
    });
};

module.exports = User;