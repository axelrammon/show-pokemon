const jwt = require('jsonwebtoken');
module.exports = {
  auth: async (req, res, next) => {
    let { authorization } = req.headers;
    if (authorization) {
      console.log('aaa')
      let [Bearer, Token] = authorization.split(' '); 
      console.log(Bearer, Token)
      if (Bearer == 'Bearer' && Token.length > 0) {
        console.log('bbb')
        jwt.verify(Token, process.env.AUTHKEY, function(err, decoded) {
          if (err) {
            if(err.name == 'TokenExpiredError'){
              res.status(403).json({
                error: 'Authorization',
                msg: 'TokenExpired'
              })
            }else{
              res.status(403).json({
                error: 'Authorization',
                msg: 'Assinatura invalida'
              })
            }
            /*
              err = {
                name: 'TokenExpiredError',
                message: 'jwt expired',
                expiredAt: 1408621000
              }
            */
          }else{
            next();
          }
        });
      } else {
          res.status(250).json({error: 'Token Malformated'})
      }
      
    }else{
      res.status(250).json({error: 'Sem Header'})
    }

  }
}