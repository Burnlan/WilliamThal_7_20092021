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

//this method returns a user using it's email (which is specified as unique in our table)
User.findByMail = (userMail, result) => {
    sql.query(`SELECT * FROM users WHERE email="${userMail}"`, (err, res) => {
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

module.exports = User;