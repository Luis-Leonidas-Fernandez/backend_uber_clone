/*
    path: api/travel

*/
const { Router } = require('express');
const { assigClient, removeClient } = require('../controllers/assigTravel');

const router = Router();


router.patch('/:_id', assigClient );
router.put('/:_id', removeClient );

module.exports = router;
