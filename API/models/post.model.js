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



//we get all posts in a given group
Post.findByGroupId = (groupId, result) => {
    
};