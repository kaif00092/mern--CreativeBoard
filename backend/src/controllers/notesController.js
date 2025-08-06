import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //-1 will be sort in desc order
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllNotesById(req, res) {
  try {
    const notes = await Note.findById(req.params.id);
    if (!notes) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createANote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function putNote(req, res) {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );

    if (!updateNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updateNote);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note delete successfully" });
  } catch (error) {
    console.error("Error found in deletion", error);
    res.status(500).json({ message: "internal server error" });
  }
}
