const router = require('express').Router();
const {
    getthoughts,
    get1thoughts,
    createthoughts,
    updatethoughts,
    deletethoughts,
    createreaction,
    deletereaction,
} = require('../../controllers/thoughtcontroller');


router.route('/').get(getthoughts).post(createthoughts);

router
  .route('/:thoughtId')
  .get(get1thoughts)
  .put(updatethoughts)
  .delete(deletethoughts);

// /api/applications/:applicationId/tags
router.route('/:thoughtId/reaction').post(createreaction);

// /api/applications/:applicationId/tags/:tagId
router.route('/:thoughtId/reaction/:reactionId').delete(deletereaction);

module.exports = router;
