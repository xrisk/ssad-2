const express = require('express');
const passport = require('passport');

const {Customer, Vendor, Listing, Order} = require('./models.js');
const router = express.Router();

router.get('/', async (req, res) => {
  if (!req.user) {
    res.redirect('/vendor/login');
    res.send();
    return;
  }
  const kek = await Listing.find();
  res.send(JSON.stringify(kek));
});

router.post(
  '/login',
  passport.authenticate('vendorLocal', {
    successRedirect: '/api/vendor',
    failureRedirect: '/api/vendor/login',
  }),
);

router.post('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
  res.send();
});

router.post('/', async (req, res) => {
  if (!req.user) {
    res.redirect('/vendor/login');
    res.send();
    return;
  }
  const data = req.body;

  const newListing = new Listing({
    name: data.name,
    price: data.price,
    minQuantity: data.min_qty,
  });
  newListing.save().then(
    () => res.send('inserted successfully'),
    () => {
      res.status(400).send('failed to insert data');
    },
  );
});

router.post('/register', async (req, res) => {
  const data = req.body;
  console.log(data);
  const newUser = new Vendor({
    username: data.username,
    password: data.password,
  });
  newUser.save();

  res.send('ok inserted');
});

module.exports = router;
