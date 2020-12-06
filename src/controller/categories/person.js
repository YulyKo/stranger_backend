const logger = require('../../utils/logger')(__filename);
const createError = require('http-errors');
const { categories: { person, preference } } = require('../../services');
let resultJSON = [];

function comparePreferencesToJSON(preferences) {
  for (let index = 0; index < resultJSON.length; index++) {
    const person = resultJSON[index];
    if (person.id === preferences[index].person_id) {
      person.user_likes.push(preferences[index]);
    }
  }
}

async function getPreferences(res) {
  const preferences = preference.getAllForPersons();
  preferences.then((data) => {
    if (data.length !== 0) comparePreferencesToJSON(preferences);
  });
  res.status(200).send(resultJSON);
}

async function getPersons(res) {
  const persons = await person.getAll();
  if (persons !== []) resultJSON = persons;
  getPreferences(res);
}

const getAll = async (req, res, next) => {
  try {
    logger.info('get all persons');
    getPersons(res);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};

async function getPersonWithPerferences(res, id) {
  let personByID = await person.get(id);
  const preferences = await preference.getForPersonByID(id);
  personByID.users = preferences;
  res.status(200).send(personByID);
}

const get = async (req, res, next) => {
  try {
    const id = req.params.id;
    logger.info(`get person by id ${id}`);
    getPersonWithPerferences(res, id);
  } catch (error) {
    logger.error(error.message);
    next(500, error.message);
  }
};

module.exports = {
  getAll,
  get,
};
