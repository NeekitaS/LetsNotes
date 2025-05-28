const User = require("../models/User");
const Note = require("../models/Note");
const Category = require("../models/Category");

exports.createNote = async (req, res) => {
    try {
        let { title, content, category } = req.body;

        if (!category) {
            category = "Uncategorized";
        }

        const user = await User.findById(req.user._id);
        let existedCategory = await Category.findOne({ name: category, owner: req.user._id });

        //if category not existed, create new category
        if (!existedCategory) {
            existedCategory = await Category.create({
                name: category,
                owner: req.user._id
            });

            user.categories.push(existedCategory._id);
        }

        const note = new Note({
            title,
            content,
            category: existedCategory._id,
            owner: req.user._id
        })
        await note.save();

        user.notes.push(note._id);
        await user.save();

        existedCategory.notes.push(note._id);
        await existedCategory.save();

        res.json({ success: true, message: "Note created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id).populate("owner category", "name email");

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }

        if (note.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this note"
            })
        }

        res.json({
            success: true,
            note
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ owner: req.user._id }).populate("owner category", "name email");

        res.status(200).json({
            success: true,
            notes
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.getCategoryNotes = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        // Check if the category belongs to the user
        if (category.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to access this category"
            })
        }

        const notes = await Note.find({ owner: req.user._id, category: category._id }).populate("category", "name");
        // const notes = [];
        // for (let i = 0; i < category.notes.length; i++) {
        //     const note = await Note.findById(category.notes[i]).populate("category", "name");
        //     notes.push(note);
        // }

        res.status(200).json({
            success: true,
            notes
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }

        if (note.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this note"
            })
        }

        const { title, content, category } = req.body;

        if (title) {
            note.title = title;
        }

        if (content) {
            note.content = content;
        }

        let oldCategory = await Category.findById(note.category);

        if (category && category !== oldCategory.name) {
            //remove the note from the old category
            const index = oldCategory.notes.indexOf(note._id);
            oldCategory.notes.splice(index, 1);
            await oldCategory.save();

            //add the note to the new category
            let existedCategory = await Category.findOne({ name: category, owner: req.user._id });

            //if category not existed, create new category
            if (!existedCategory) {
                existedCategory = await Category.create({
                    name: category,
                    owner: req.user._id
                });

                const user = await User.findById(req.user._id);
                user.categories.push(existedCategory._id);
                await user.save();
            }

            existedCategory.notes.push(note._id);
            await existedCategory.save();

            note.category = existedCategory._id;
        }

        await note.save();

        res.status(200).json({
            success: true,
            message: "Note updated successfully"
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }

        if (note.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this note"
            })
        }

        //deleting the note from the user notes array
        const user = await User.findById(req.user._id);
        const index = user.notes.indexOf(req.params.id);
        user.notes.splice(index, 1);
        await user.save();

        //deleting the note from the category notes array
        const category = await Category.findById(note.category);
        const index2 = category.notes.indexOf(req.params.id);
        category.notes.splice(index2, 1);
        await category.save();

        //deleting the note
        await Note.findByIdAndDelete(note._id);

        res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}