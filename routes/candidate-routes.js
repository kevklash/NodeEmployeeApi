const express = require('express');

const controller = require('../controllers/candidates-controller')

const router = express.Router();

// router.get('/candidates/search/:skill', controller.searchCandidates);
router.get('/candidates/search', controller.searchCandidates);

router.post('/candidates', controller.createCandidate);

  module.exports = router;