const router = require('express').Router();
const { createCategory, getCategories, deleteCategory, updateCategory } = require('../controllers/category');
const { isAuthenticated } = require('../middlewares/auth')

router.route("/category").post(isAuthenticated, createCategory);
router.route("/categories").get(isAuthenticated, getCategories);
router.route("/category/:id")
    .put(isAuthenticated, updateCategory)
    .delete(isAuthenticated, deleteCategory)

module.exports = router;