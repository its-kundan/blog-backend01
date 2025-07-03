import express from "express";
import {
  createPost,
  getAllPosts,
  getPostBySlug,
  updatePost,
  deletePost,
} from "../controllers/postController";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", verifyToken, isAdmin, (req, res) => {
  createPost(req, res).then().catch(err => console.error(err));
});
router.get("/", (req, res) => {
  getAllPosts(req, res).then().catch(err => console.error(err));
});
router.get("/:slug", (req, res) => {
  getPostBySlug(req, res).then().catch(err => console.error(err));
});
router.put("/:id", verifyToken, isAdmin, (req, res) => {
  updatePost(req, res).then().catch(err => console.error(err));
});
router.delete("/:id", verifyToken, isAdmin, (req, res) => {
  deletePost(req, res).then().catch(err => console.error(err));
});

export default router;