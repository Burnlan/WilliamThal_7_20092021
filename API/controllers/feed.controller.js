//this controller requires the post and reply model
const Post = require('../models/post.model.js');
const Reply = require('../models/reply.model.js');

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
};

exports.archiveReply = (req, res, next) => {
    const replyId = req.body.replyId;
    Reply.archive(replyId, (err, result) => {
        res.status(200).json({message: "Reply archived"})
    })
};

exports.reply = (req, res, next) => {
    const newReply = new Reply({
        user_id: req.session.userData.id,
        post_id: req.body.postId,
        content: req.body.content
    })
    Reply.create(newReply, (err, result) => {
        console.log("succes : "+result);
        res.status(200).json({message: "Replied"})
    })
};

exports.getReplies = (req, res, next) => {
    const postId = req.body.postId;
    Reply.getByPost(postId, (err, result) => {
        res.status(200).json(result);
    });
};