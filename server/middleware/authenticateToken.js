const userToken = require('../models/token');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  const dataUserToken = userToken.token();
  const user = dataUserToken.find(user => user.token === token);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};
module.exports = authenticateToken;
