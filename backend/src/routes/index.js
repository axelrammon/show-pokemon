const router = require('express').Router();
const User = require('../app/model/User');
const bcrypt = require('bcryptjs');
const {auth} = require('../app/controllers/AuthController')
const { store, login } = require('../app/controllers/UserController');

router.post('/register', store);
router.post('/login', login);

router.use(auth);

router.post('/test',async (req, res)=>{
  res.status(200).json({ok: true});
})

module.exports = router;