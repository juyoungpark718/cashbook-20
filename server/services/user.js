const User = require('../models')['User'];
const Card = require('../models')['Card'];
const fetch = require('node-fetch');
const { generateJWT } = require('../utils/jwt');

const getAccessToken = code => {
  return fetch('https://github.com/login/oauth/access_token', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      code,
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
    }),
  }).then(res => res.json());
};

const getUserInfo = accessToken => {
  return fetch('https://api.github.com/user', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `token ${accessToken}`,
    },
  }).then(res => res.json());
};

const auth = async code => {
  const { error, access_token: accessToken } = await getAccessToken(code);

  if (error) return { error };

  const { message, login: email, avatar_url: profileUrl } = await getUserInfo(accessToken);

  if (message) {
    return { error: message };
  }

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      email,
      profileUrl,
    },
  });
  const cards = await Card.findAll({
    attributes: ['id', 'name'],
    where: {
      UserId: user.id,
    },
    include: ['cardCategory', 'user'],
  });

  const token = generateJWT({ id: user.id, email: user.email });

  return { created, token, cards };
};

module.exports = {
  auth,
};
