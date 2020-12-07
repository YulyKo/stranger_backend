const crypto = require('crypto');
const { knex } = require('../../db');
const config = require('../../config');

module.exports.create = async data => {
  const { login, password, name, date_of_birth } = data;

  const password_hash = crypto
    .pbkdf2Sync(password, config.SECRET, 1000, 64, 'sha512')
    .toString('hex');

  const [res] = await knex('users')
    .insert({
      login,
      password_hash,
      name: name,
      date_of_birth: date_of_birth
    })
    .returning(['token', 'id']);
  return res;
};

module.exports.findByLogin = async login => {
  const [res] = await knex('users').where({
    login
  });
  return res;
};
module.exports.loginExist = async login => {
  const [res] = await knex('users')
    .select('login')
    .where({
      login
    });
  return res ? true : false;
};

module.exports.validPassword = (password, hash) => {
  const Hash = crypto
    .pbkdf2Sync(password, config.SECRET, 1000, 64, 'sha512')
    .toString('hex');
  return Hash === hash;
};

module.exports.getByToken = async token => {
  const [result] = await knex.from('users').where({ token });
  return result;
};
module.exports.remove = async token => {
  await knex
    .from('users')
    .where({ token })
    .del();
};
