const express = require('express')
const { createCandidate, getCandidate, voteCandidate } = require('../controllers/candidateController')
const { authenticateUser } = require('../middleware/auth')

const router = express.Router()

router.post('/candidate',createCandidate)
router.get('/getCandidates',authenticateUser,getCandidate)
router.post('/vote/:candidateId',authenticateUser,voteCandidate)

    

module.exports = router