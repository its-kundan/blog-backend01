import { Request, Response } from 'express';
import { Post } from '../models/post'; // ✅ ensure correct casing in both file and import

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ msg: 'Post not found' });
      return;
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, author } = req.body;
    const post = new Post({ title, content, author });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid Data' });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ msg: 'Post not found' });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ msg: 'Update Failed' });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ msg: 'Post not found' });
      return;
    }
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
