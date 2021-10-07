const sql = require("./db.js");

//We create a constructor
const Post = function(post) {
    this.user_id = post.user_id;
    this.group_id = post.group_id;
    this.content = post.content;
    this.date_created = new Date().toISOString().slice(0, 19).replace('T', ' '); //this code gives us mysql date format
    this.date_updated = null;
    this.date_deleted = null;
};

//we create a new post
Post.create = (newPost, result) => {
    console.log("function called");
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("created post: ", { id: res.insertId, ...newPost });
        result(null, res);
        return;
      });
};


//we get all not-archived posts in a given group, with an inner join to also send back the name of the user associated with the post
Post.findByGroupId = (groupId, result) => {
  //the query is long so we type it in a const
  //we select the non-archived posts and their relevant data and order by from newest to oldest
  const query = `SELECT posts.id, posts.content, posts.date_created, posts.date_updated, users.firstname, users.lastname, users.id AS userId
                FROM posts INNER JOIN users on posts.user_id=users.id 
                WHERE group_id="${groupId}" AND posts.date_deleted IS NULL
                ORDER BY date_created DESC`

  sql.query(query, (err, res) => {
    //if there is an error in the request
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
    //We check that we have a not-empty array
    if (res.length) {
    //we return an aray containing all the posts and their data
      result(null, res);
      return;
    }
    //if the request is ok but hasn't found anything.
    result({ kind: "not_found" }, null);
  });
};

//users can't delete post, they can only "archive" them
Post.archive = (postId, result) => {
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  sql.query(`UPDATE posts SET date_deleted='${timestamp}' WHERE posts.id=${postId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null)
      return;
    }
    //If everything is alright we have nothing more to do
    console.log("archived post");
    result(null, res);
    return;
  });
};

module.exports = Post;