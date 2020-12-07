const logger = require('../../../utils/logger')(__filename);
const createError = require('http-errors');
const { categories: { art, tag } } = require('../../../services');

let resultJSON = [];

const get = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const artData = await art.get();
    resultJSON = artData;
    resultJSON.tags = [];
    const tags = await tag.getForArt(id);
    resultJSON.tags = tags;
    console.log(id);
    res.status(200).send(resultJSON);
  } catch (error) {
    logger.info(error.message);
    next(createError(500, error.message));
  }
};

module.exports = {
  get,
};
