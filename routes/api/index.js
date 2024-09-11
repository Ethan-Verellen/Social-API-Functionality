const router = require('express').Router();
const userr = require('./userRoutes');
const thoughtr = require('./thoughtRoutes');

router.use('/user', userr);
router.use('/thought', thoughtr);

module.exports = router;
