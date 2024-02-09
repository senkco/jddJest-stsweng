const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
  }
);

const Post = mongoose.model('posts', postSchema);

exports.createPost = (obj, next) => {
    const post = new Post(obj);

    post.save(function(err, post) {
        next(err, post)
    }) 
}

exports.updatePost = (postId, newData, next) => {
    Post.findByIdAndUpdate(postId, newData, { new: true }, (err, updatedPost) => {
        next(err, updatedPost);
    });
};

exports.findPost = (postId, next) => {
    Post.findById(postId, (err, post) => {
        if (err) {
            next(err, null);
        } else if (!post) {
            // If no post is found with the given ID, return a custom error
            const error = new Error('Post not found');
            error.status = 404;
            next(error, null);
        } else {
            next(null, post);
        }
    });
};