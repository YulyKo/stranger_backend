const logger = require('../../../utils/logger')(__filename);
const createError = require('http-errors');
const { tag } = require('../../services/categories');
const { default: commonRemovingSmthById } = require('../../utils/commonRemovingSmthById');


const create = async (req, res, next) => {
  try {
    logger.info('create tag');
    const { newTag, type } = req.data;
    if (type === 'tag') {
      await tag.create('tags', newTag);
    } else if (type === 'relatioship') {
      await tag.create('type_relatiosnhip', newTag);
    }
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};

const remove = async (req, res, next) => {
  try {
    logger.info('remove tag|relationship');
    const {id, type} = req.params;
    if (type === 'art') {
      await commonRemovingSmthById.remove('art_tag', 'id_tag', id);
    } else if (type === 'plot') {
      await commonRemovingSmthById.remove('plot_tag', 'id_tag', id);
    } else if (type === 'relationship') {
      await commonRemovingSmthById.remove('relationships', 'id_type_relationship', id);
    }
    await commonRemovingSmthById.remove('tags', 'id', id);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};
module.exports = {
  create,
  remove,
};
