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

module.exports = {
  getTagsForPlots,
  getForPlot,
};
