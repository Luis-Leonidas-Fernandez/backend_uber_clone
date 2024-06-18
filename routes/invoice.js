/*
    path: api/invoice

*/
const { Router } = require( 'express');
const { createInvoicePdf, createInvoice, getInvoice, getInvoicePdf } = require( '../controllers/invoice');

const router = Router();

router.post('/new', createInvoice );
router.get('/get-invoice/:_id', getInvoice);

router.get('/create-pdf-invoice', createInvoicePdf);
router.get('/get-pdf-invoice/:_id', getInvoicePdf);



module.exports = router;