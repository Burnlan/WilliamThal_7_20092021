const sql = require("./db.js");

//We create a constructor
const Reply = function(reply) {
    this.user_id = reply.user_id;
    this.post_id = reply.post_id;
    this.content = post.content;
    this.date_created = new Date().toISOString().slice(0, 19).replace('T', ' '); //this code gives us mysql date format
    this.date_updated = null;
    this.date_deleted = null;
};

//we create a new post
Reply.create = (newReply, result) => {
    console.log("function called");
    sql.query("INSERT INTO replies SET ?", newReply, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("created replyy: ", { id: res.insertId, ...newReply });
        result(null, res);
        return;
      });
};