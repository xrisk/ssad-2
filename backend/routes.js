const express = require('express');
const router = express.Router();
const {Customer, Vendor, Listing, Order} = require('./models.js');
const passport = require('passport');

const vendorRoutes = require('./vendorRoutes.js');
const customerRoutes = require('./customerRoutes.js');

router.get('/', (req, res) => {
  res.send('hello world');
});

router.use('/vendor', vendorRoutes);
router.use('/customer', customerRoutes);

module.exports = router;
