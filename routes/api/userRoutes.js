const router = require('express').Router();
const {
    getuser,
    get1user,
    createuser,
    updateuser,
    deleteuser,
    createfriend,
    deletefriend,
} = require('../../controllers/usercontroller');


router.route('/')
.get(getuser)
.post(createuser);

router
  .route('/:userId')
  .get(get1user)
  .put(updateuser)
  .delete(deleteuser);

// /api/applications/:applicationId/tags
router.route('/:userId/friend').post(createfriend);

// /api/applications/:applicationId/tags/:tagId
router.route('/:userId/friend/:friendId').delete(deletefriend);

module.exports = router;
