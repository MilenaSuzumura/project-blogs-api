const { getInfoUser } = require('../utils/jwt.utils');
const { findPostsId } = require('../callModel/blogPost.callModel');

const verifySameUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = getInfoUser(authorization);
  const idPost = req.params.id;

  const infoPost = await findPostsId(idPost);

  if (!infoPost || infoPost.userId !== id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

module.exports = verifySameUser;