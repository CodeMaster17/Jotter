const { getUserDetails, addLinks } = require('../Controllers/User.controller');
const ensureAuthenticated = require('../Middlewares/Auth');


const router = require('express').Router();

router.get('/details', ensureAuthenticated, getUserDetails)
router.post('/add-links', ensureAuthenticated, addLinks);

module.exports = router;