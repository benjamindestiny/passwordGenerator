import express from "express";
import {
  getPasswords,
  addPassword,
  deletePassword,
} from "../controllers/passwordController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware); // protect all routes
router.get("/", getPasswords);
router.post("/", addPassword);
router.delete("/:id", deletePassword);

export default router;
