const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  store: async (req, res) => {
    let { email } = req.body;

    const emailExist = await User.findOne({ email });
    
    if (emailExist) {
      return res.status(400).json({error:'Email já existe'});
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
  
    try {
      const savedUser = await user.save();
  
      res.send({ user: user._id });
    } catch (err) {
      res.status(400).send(err);
    }
},
login: async (req, res) => {
  let { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user){
    return res.status(200).send('Email não encontrado');
  }
  const validPass =  await bcrypt.compare(password, user.password);
  
  if (!validPass){
    return res.status(200).json({error: 'Senha inválida'});
  }
  user.password = undefined;
  const {_id } = user;

  jwt.sign({ email,_id, password }, process.env.AUTHKEY, { expiresIn: 86400 }, function(err, data) {
    if(err){
      res.status(403).json({error: 'token não foi criado'});
    }else{
      res.status(200).json({user, token: data});
    }
  });

},
}