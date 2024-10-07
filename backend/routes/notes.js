const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Note = require("../models/Note.js");

// Route-1 : Add notes end point '/api/notes/addnotes' (login required) 
router.post("/addnotes", fetchuser, [
    body("title", "Title must be minimum of 3 characters").isLength({ min: 3 }),
    body("description", "Decription must be a minimum of 5 characters").isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ "error": errors.array() });
    }
    const isThisTitleExists = await Note.findOne({ title: req.body.title });
    if (isThisTitleExists) {
        return res.status(409).send({ "error": "A notes with this title already exists" })
    }
    try {
        const { title, description, tag } = req.body;
        const note = await Note.create({
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        });
        res.send(note);
    } catch (error) {
        console.error(error);
        res.send("Internal server error")
    }
});


// Route-2 : fetch all notes end point '/api/notes/readnotes' (login required) 
router.post("/readnotes", fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.send(notes)
        console.log("Saved notes count : " + notes.length)
    } catch (error) {
        console.error(error);
        res.send("Internal server error")
    }
});


// Route-3 : update notes end point '/api/notes/updatenotes' (login required) 
router.put("/updatenotes/:id", fetchuser, [
    body("title", "Title must be minimum of 3 characters").isLength({ min: 3 }),
    body("description", "Decription must be a minimum of 5 characters").isLength({ min: 5 })
], async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check if the note exists
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ error: "Notes not found" });
        }
        const { title, description, tag } = req.body;
        const updatedNotes = {}
        if (title) { updatedNotes.title = title }
        if (description) { updatedNotes.description = description }
        if (title) { updatedNotes.tag = tag }
        const notes = await Note.findByIdAndUpdate(id, { $set: updatedNotes }, {new : true})
        res.send(notes)
    } catch (error) {
        console.error(error);
        res.send("Internal server error")
    }
});


// Route-4 : Delete a note end point '/api/notes/deletenote' (login required) 
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    const {id} = req.params;
    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ error: "Notes not found" });
        }
        await Note.findByIdAndDelete(id)
        res.status(200).json({ message: "Deleted the note: " + note.title });
    } catch (error) {
        console.error(error);
        res.send("Internal server error")
    }
});

module.exports = router;