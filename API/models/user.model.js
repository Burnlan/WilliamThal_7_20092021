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

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created customer: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

module.exports = User;