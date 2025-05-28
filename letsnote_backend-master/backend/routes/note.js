const router = require('express').Router();
const { createNote, getNote, getNotes, getCategoryNotes, updateNote, deleteNote } = require('../controllers/note')
const { isAuthenticated } = require('../middlewares/auth')

router.route("/note").post(isAuthenticated, createNote);
router.route("/note/:id")
    .get(isAuthenticated, getNote)
    .put(isAuthenticated, updateNote)
    .delete(isAuthenticated, deleteNote)

router.route("/notes").get(isAuthenticated, getNotes);
router.route("/notes/:id").get(isAuthenticated, getCategoryNotes);

module.exports = router;