import express from "express";
import {
  createANote,
  deleteNote,
  getAllNotes,
  getAllNotesById,
  putNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getAllNotesById);

router.post("/", createANote);

router.put("/:id", putNote);
router.delete("/:id", deleteNote);

export default router;
