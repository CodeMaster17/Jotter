const { getUserDetails, addLinks, updateLink, deleteLink } = require('../Controllers/User.controller');
const ensureAuthenticated = require('../Middlewares/Auth');


const router = require('express').Router();

router.get('/details', ensureAuthenticated, getUserDetails)
router.post('/add-links', ensureAuthenticated, addLinks);
router.put("/update/:id", ensureAuthenticated, updateLink);
router.delete("/delete/:id", ensureAuthenticated, deleteLink);

module.exports = router;