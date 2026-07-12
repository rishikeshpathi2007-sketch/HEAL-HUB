import Post from "../models/Post.js";

export const createPost = async (req, res) => {

    try {

        const { content } = req.body;

        let image = "";

        if (req.file) {

        image = req.file.filename;

        }

        const post = await Post.create({

        author: req.user._id,

        content,

        image,

        });
        res.status(201).json({
            message: "Post created successfully",
            post,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

export const getPosts = async (req, res) => {

    try {

        const posts = await Post.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json(posts);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }


};

export const deletePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {

            return res.status(404).json({
                message: "Post not found",
            });

        }

        if (post.author.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                message: "You are not authorized to delete this post.",
            });

        }

        await post.deleteOne();

        res.json({
            message: "Post deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};