//this controller requires the post and reply model
const Post = require('../models/post.model.js');

exports.createPost = (req, res, next) => {
    //we create a post using userdata from the session and post data from the client request
    const newPost = new Post({
        user_id: req.session.userData.id,
        group_id: req.body.groupId,
        content: req.body.content
    })
    Post.create(newPost, (err, result) => {
        res.status(201).json({ message: "New post created"})
    })
};

exports.getPosts = (req, res, next) => {
    const groupId = req.body.groupId;
    Post.findByGroupId(groupId, (err, posts) => {
        res.status(200).json(posts);
    })
};

exports.archivePost = (req, res, next) => {
    const postId = req.body.postId;
    Post.archive(postId, (err, result) => {
        res.status(200).json({message: "Post archived"})
    })
}