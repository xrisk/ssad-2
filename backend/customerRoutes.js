const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
  const data = req.body;
  const newUser = new Customer({
    username: data.username,
    password: data.password,
  });
  newUser.save();
  res.send('ok inserted');
});

module.exports = router;
