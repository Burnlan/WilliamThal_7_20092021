//this controller requires the post and reply model
const Post = require('../models/post.model.js');

exports.createPost = (req, res, next) => {
    //we create a post using userdata from the session and post data from the client request
    const newPost = new Post({
        user_id: req.session.userData.id,
        group_id: req.body.groupId,
        content: req.body.content
    })
    Post.create(newPost)
        .then(() => res.status(201).json({ message: "New post created"}))
        .catch(error => res.status(400).json({error}))
};

exports.getPosts = (req, res, next) => {
    const groupId = req.body.groupId;
    Post.findByGroupId(groupId, (err, posts) => {
        res.status(200).json(posts);
    })
};