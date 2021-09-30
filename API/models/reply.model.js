const sql = require("./db.js");

//We create a constructor
const Reply = function(reply) {
    this.user_id = reply.user_id;
    this.post_id = reply.post_id;
    this.content = reply.content;
    this.date_created = new Date().toISOString().slice(0, 19).replace('T', ' '); //this code gives us mysql date format
    this.date_updated = null;
    this.date_deleted = null;
};

//we create a new post
Reply.create = (newReply, result) => {
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

//we get all the not-archived replies associated with a post, with an inner join to also get user info
Reply.getByPost = (postId, result) => {
  const query = `SELECT replies.id, replies.content, replies.date_created, replies.date_updated, users.firstname, users.lastname
                  FROM replies INNER JOIN users on replies.user_id=users.id
                  WHERE post_id=${postId} AND replies.date_deleted IS NULL`
  sql.query(query, (err, res) => {
    //if there is an error in the request
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //We check that we have a not-empty array
    if (res.length) {
      //we return an aray containing all the replies
        result(null, res);
        return;
      }
      //if the request is ok but hasn't found anything.
      result({ kind: "not_found" }, null);
  });
};

module.exports = Reply;