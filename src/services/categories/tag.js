const { knex } = require('../../db');

const getTagsForPlots = async () => {
  const tags = await knex('plot_tag')
    .select(
      'plot_tag.id_plot',
      'tags.id',
      'tags.name',
      'tags.bg_color',
      'tags.text_color'
    ).join('tags', { 'tags.id': 'plot_tag.id_tag' });
    return tags;
};

const getForPlot = async (id) => {
  const tags = await knex('plot_tag')
    .select(
      'tags.id',
      'tags.name',
      'tags.bg_color',
      'tags.text_color'
    )
    .leftJoin('tags', { 'tags.id': 'plot_tag.id_tag' })
    .where({ 'plot_tag.id_plot': id });
  return tags;
};

async function getTypeID(type) {
  return await knex('type_tags').select('id').where({ 'type_name': type });
}

const getByTypeName = async (typeName) => {
  const tags = await knex('tags')
    .whereIn('id_type', getTypeID(typeName));
  return tags;
};

const getAllTagsForCategory = async (tagTypeName) => {
  const tableCategoryName = `${tagTypeName}_tag`;
  const tags = knex(tableCategoryName)
    .leftJoin('tags', { 'tags.id': `${tableCategoryName}.id_tag` });
  return tags;
};

const getForArt = async (id) => {
  // `${tableCategoryName}.id_${tagTypeName}`
  const tags = await knex('art_tag')
    .leftJoin({ 'tags': 'art_tag.id_tag' })
    .where({ 'art_tag.id_art': id });
  return tags;
};

// const getAllTagsForCategoryByID = async (tagTypeName, id) => {
//   const tableCategoryName = `${tagTypeName}_tag`;
//   const tags = await knex(tableCategoryName)
//     .leftJoin('tags', { 'tags.id': `${tableCategoryName}.id_tag` })
//     .where({ `${tableCategoryName}.id_${tagTypeName}`: id });
//   return tags;
// };

module.exports = {
  getTagsForPlots,
  getForPlot,
  getByTypeName,
  getForArt,
  getAllTagsForCategory,
};
