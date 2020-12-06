const logger = require('../../../utils/logger')(__filename);
const createError = require('http-errors');
const { categories: { art, preference } } = require('../../../services');
let resultJSON = [];

function comparePreferencesToJSON(preferences) {
  resultJSON.forEach((art) => {
    art.users = [];
    for (let index = 0; index < preferences.length; index++) {
      if (art.id === preferences[index].id_art) {
        art.users.push(preferences[index]);
      }
    }
  });
}

async function getPreferences(res) {
  const preferences = await preference.getAllForArts;
  if (preferences.length !== 0) comparePreferencesToJSON(preferences);
  res.status(200).send(resultJSON);
}

const get = async (req, res, next) => {
  try {
    const arts = await art.getAll();
    resultJSON = arts;
    getPreferences(res);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};

module.exports = {
  get,
};
