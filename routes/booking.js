/*
    path: api/booking

*/
const { Router } = require('express');
const { removeDriver, assigDriverAutomatic } = require('../controllers/assigDriver');

const router = Router();


router.patch('/:_id', assigDriverAutomatic );
router.put('/remove', removeDriver );


module.exports = router;
