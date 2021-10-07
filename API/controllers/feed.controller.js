//this controller requires the post and reply model
const Post = require('../models/post.model.js');
const Reply = require('../models/reply.model.js');
const { post } = require('../routes/user.routes.js');

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
        if(!posts){
            //if there aren't any posts we simply send the empty array
            res.status(200).json(posts);
            return
        }
        //now we add to each posts in the array a value "hasRights" depending on the current userId and their rights.
        if(req.session.userData.rightsId == 3) {
            //if the user is a super user we set hasRights to true for every post
            for(i=0; i<posts.length; i++) {
                posts[i].hasRights = true;
                console.log(posts[i])
            }
            res.status(200).json(posts);
        } else {
            //if the user is not a superuser we set hasRights to true only on their own posts
            const userId = req.session.userData.id;
            for(i=0; i<posts.length; i++) {
               if(posts[i].userId == userId){
                   posts[i].hasRights = true
               } else {
                   posts[i].hasRights = false
               }
            }
            res.status(200).json(posts);
        }
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
    Reply.getByPost(postId, (err, replies) => {
        if(!replies){
            //if there aren't any posts we simply send the empty array
            res.status(200).json(replies);
            return
        }
        //now we add to each posts in the array a value "hasRights" depending on the current userId and their rights.
        if(req.session.userData.rightsId == 3) {
            //if the user is a super user we set hasRights to true for every post
            for(i=0; i<replies.length; i++) {
                replies[i].hasRights = true;
            }
            res.status(200).json(replies);
        } else {
            //if the user is not a superuser we set hasRights to true only on their own posts
            const userId = req.session.userData.id;
            for(i=0; i<replies.length; i++) {
               if(replies[i].userId == userId){
                   replies[i].hasRights = true
               } else {
                   replies[i].hasRights = false
               }
            }
            res.status(200).json(replies);
        }
    });
};