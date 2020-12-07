const logger = require('../../../utils/logger')(__filename);
const createError = require('http-errors');
const { categories: { art } } = require('../../../services');

function compareResultArray(result) {
  let newResults = [];
  result.forEach(object => {
    logger.info(typeof newResults);
    if (newResults.length === 0) {
      newResults = {
        id: object.id_art,
        title: object.title,
        author: object.author,
        url: object.url,
        likes: object.likes,
        tags: [],
      };
      newResults.tags.push({
        id: object.id_tag,
        name: object.name,
        text_color: object.text_color,
        bg_color: object.bg_color
      });
      console.log(newResults);
    }
    newResults.tags.forEach((tag) => {
      if (tag.id === object.id_tag) {
        newResults.tags.push({
          id: object.id_tag,
          name: object.name,
          text_color: object.text_color,
          bg_color: object.bg_color
        });
      }
    });
  });
  return newResults;
}

const get = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const artData = await art.get(id);
    res.status(200).send(compareResultArray(artData));
  } catch (error) {
    logger.info(error);
    next(createError(500, error));
  }
};

module.exports = {
  get,
};
