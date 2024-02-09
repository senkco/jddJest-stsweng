const PostModel = require('../models/post.model');
const PostController = {};

PostController.create = (req, res) => {
    return PostModel.createPost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    })

};

PostController.update = (req, res) => {
// Extract post ID from request parameters
    const postId = req.params.id;
    
// Call the updatePost method of PostModel with the post ID and updated data
    PostModel.updatePost(postId, req.body, (err, updatedPost) => {
        if (err) {
            // If there's an error, return status 500
            return res.status(500).end();
        } else {
                // If successful, return the updated post as JSON
             return res.json(updatedPost);
        }
    });
};

PostController.findPost = (req, res) => {
    // Extract post ID from request parameters
    const postId = req.params.id;

    // Call the findPost method of PostModel with the post ID
    PostModel.findPost(postId, (err, foundPost) => {
        if (err) {
            // If there's an error, return status 500
            return res.status(500).end();
        } else {
            // If post is found, return it as JSON
            return res.json(foundPost);
        }
    });
};

PostController.getAllPosts = (req, res) => {

};

module.exports = PostController;
