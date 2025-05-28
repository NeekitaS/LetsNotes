const router = require('express').Router();
const { registerUser, loginUser, logoutUser, getMyProfile, updateMyProfile, getUser, deleteMyProfile } = require('../controllers/user')
const { isAuthenticated } = require('../middlewares/auth');

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticated, logoutUser);
router.route("/me")
    .get(isAuthenticated, getMyProfile)
    .put(isAuthenticated, updateMyProfile)
    .delete(isAuthenticated, deleteMyProfile);

router.route("/user/:id").get(isAuthenticated, getUser);

module.exports = router;