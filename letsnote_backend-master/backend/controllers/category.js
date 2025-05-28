const Category = require("../models/Category");
const User = require("../models/User");
const Note = require('../models/Note')

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        let category = await Category.findOne({ name, owner: req.user._id });

        if (category) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            })
        }

        category = new Category({
            name,
            owner: req.user._id
        });

        await category.save();

        const user = await User.findById(req.user._id);
        user.categories.push(category._id);

        await user.save();

        res.status(201).json({
            success: true,
            message: "Category created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ owner: req.user._id }).populate("notes");

        res.status(200).json({
            success: true,
            categories,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        if (category.owner._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to delete this category"
            })
        }

        const user = await User.findById(req.user._id);

        //deleting all notes within given category for the current user
        // const notes = await Note.find({ category: category._id, owner: req.user._id })
        // console.log(notes);
        for (let i = 0; i < category.notes.length; i++) {
            await Note.findByIdAndDelete(category.notes[i]._id);

            //delete the note from the user notes array
            const index = user.notes.indexOf(category.notes[i]._id);
            user.notes.splice(index, 1);
        }

        //deleting the category from the user categories array
        const index = user.categories.indexOf(category._id);
        user.categories.splice(index, 1);
        await user.save();

        await Category.deleteOne({ _id: category._id });

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        if (category.owner._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to update this category"
            })
        }

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Please enter updated category name"
            })
        }

        category.name = name;

        await category.save();
        res.status(200).json({
            success: true,
            message: "Category updated successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}