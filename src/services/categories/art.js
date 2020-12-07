const { knex } = require('../../db');

const getAll = async ()  => {
  // return await knex('arts');
  return await knex('art_tag')
    .select(
      'art_tag.id_tag',
      'tags.name',
      'tags.bg_color',
      'tags.text_color',
      'art_tag.id_art',
      'arts.author',
      'arts.title',
      'arts.url',
      'arts.likes',
    )
    .leftJoin('tags', { 'tags.id': 'art_tag.id_tag' })
    .join('arts', { 'arts.id': 'art_tag.id_art' });
};

const get = async (id) => {
  return await knex('arts').where({ id });
};

module.exports = {
  getAll,
  get,
};
