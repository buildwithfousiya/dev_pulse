const express = require('express');
const router = express.Router();
const {getIssues,getIssueById,createIssue,updateIssue,deleteIssue,getIssueStats} = require('../controllers/issueController');

router.get('/stats', getIssueStats);

router.route('/')
  .get(getIssues)
  .post(createIssue);

router.route('/:id')
  .get(getIssueById)
  .put(updateIssue)
  .delete(deleteIssue);

module.exports = router;
