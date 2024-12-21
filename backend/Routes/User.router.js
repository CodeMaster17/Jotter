const { getUserDetails, addLinks, updateLink, deleteLink } = require('../Controllers/User.controller');
const ensureAuthenticated = require('../Middlewares/Auth');


const router = require('express').Router();

router.get('/details', ensureAuthenticated, getUserDetails)
router.post('/add-links', ensureAuthenticated, addLinks);
router.put("/update/:id", updateLink);
router.delete("/delete/:id", deleteLink);

module.exports = router;