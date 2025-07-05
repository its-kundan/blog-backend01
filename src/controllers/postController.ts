// controllers/postController.ts
import { Request, Response } from "express";
import { Post } from "../models/post";
import { slugify } from "../utils/slugify";
import { markdownToHtml } from "../utils/markdownToHtml";
import { calculateReadTime } from "../utils/readTime";

interface CustomRequest extends Request {
  user?: { id: string; role: string; username: string };
}

export const createPost = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { title, content, coverImage, tags, status } = req.body;
    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const slug = slugify(title);
    const htmlContent = content ? await markdownToHtml(content) : "";
    const readTime = content ? calculateReadTime(content) : "0 min read";

    const newPost = new Post({
      title,
      slug,
      content: content || "",
      htmlContent,
      coverImage: coverImage || "",
      tags: tags || [],
      readTime,
      author: req.user?.id,
      status: status || "draft",
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Post creation failed", details: err });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const updates = req.body;
    if (updates.title) updates.slug = slugify(updates.title);
    if (updates.content) {
      updates.htmlContent = await markdownToHtml(updates.content);
      updates.readTime = calculateReadTime(updates.content);
    }
    const post = await Post.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const getPostBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate("author", "username");
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving post" });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
