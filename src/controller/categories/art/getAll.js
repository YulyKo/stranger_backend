const logger = require('../../../utils/logger')(__filename);
const createError = require('http-errors');
const { categories: { tag, art } } = require('../../../services');
let resultJSON = [];

function compareTagsToJSON(tags) {
  for (let index = 0; index < resultJSON.length; index++) {
    const art = resultJSON[index];
    art.tags = [];
    if (art.id === tags[index].id_art) {
      art.tags.push(tags[index]);
    }
  }
}

async function getTags(res) {
  const tags = await tag.getAllTagsForCategory('art');
  if (tags !== []) compareTagsToJSON(tags);
  res.status(200).send(resultJSON);
}

const get = async (req, res, next) => {
  try {
    const arts = await art.getAll();
    resultJSON = arts;
    getTags(res);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};

module.exports = {
  get,
};
