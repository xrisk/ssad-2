const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
  name: String,
  price: {
    type: Number,
    min: [1, 'price cannot be less than 1'],
  },
  minQuantity: {
    type: Number,
    min: [1, 'order quantity should be nonzero'],
  },
  status: {
    type: String,
    enum: ['waiting', 'placed', 'dispatched', 'canceled'],
  },
});

const vendorSchema = mongoose.Schema({
  username: String,
  password: String,
});

vendorSchema.statics.authenticate = function(username, password, done) {
  console.log('trying to authenticate!');
  Vendor.findOne({username: username}, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, {message: 'Incorrect username'});
    console.log(user, password);
    if (user.password !== password)
      return done(null, false, {message: 'Incorrect password'});
    return done(null, user);
  });
};

const customerSchema = mongoose.Schema({
  username: String,
  password: String,
});

customerSchema.statics.authenticate = function(username, password, done) {
  customerSchema.findOne({username: username}, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, {message: 'Incorrect username'});
    if (user.hash !== password)
      return done(null, false, {message: 'Incorrect password'});
    return done(null, user);
  });
};

const orderSchema = mongoose.Schema({
  vendor: mongoose.ObjectId,
  customer: mongoose.ObjectId,
});

const Customer = mongoose.model('User', customerSchema);
const Vendor = mongoose.model('Vendor', vendorSchema);
const Listing = mongoose.model('Listing', listingSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = {
  Customer: Customer,
  Vendor: Vendor,
  Listing: Listing,
  Order: Order,
};
