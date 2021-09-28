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
          return;
        }
        console.log("created post: ", { id: res.insertId, ...newPost });
      });
};


//we get all posts in a given group
Post.findByGroupId = (groupId, result) => {
  sql.query(`SELECT * FROM posts WHERE group_id="${groupId}"`, (err, res) => {
    //if there is an error in the request
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
    //We check that we have a not-empty array
    if (res.length) {
    //we return an aray containing all the posts
      console.log(res);
      result(null, res);
      return;
    }
    //if the request is ok but hasn't found anything.
    result({ kind: "not_found" }, null);
});
};


module.exports = Post;