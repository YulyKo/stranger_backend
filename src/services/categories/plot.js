const { knex } = require('../../db');

const getAll = async () => {
  const plots = await knex('plots')
    .select(
      'plots.id',
      'plots.title',
      'plots.description',
      'plots.text',
      'plots.author',
      'plots.likes',
    );
  return plots;
};

const getById = async (id) => {
  console.log('get by id');
  const [ plot ] = await knex('plots')
    .where({ id });
  return plot;
};

const create = async (newPlot) => {
  const [id_plot] = await knex('plots')
  .insert({
    author: newPlot.login,
    title: newPlot.title,
    text: newPlot.text,
    description: newPlot.description
  })
  .returning('id');
  if (typeof newPlot.id_locations[0] === 'number') {
    setAdditionalInfoOfPlot('locaiton', id_plot, newPlot.id_locations);
  }
  if (typeof newPlot.id_persons[0] === 'number') {
    setAdditionalInfoOfPlot('persins', id_plot, newPlot.id_persons);
  }
  if (typeof newPlot.id_tags[0] === 'number') {
    setAdditionalInfoOfPlot('tag', id_plot, newPlot.id_tags);
  }
  return id_plot;
};

async function setAdditionalInfoOfPlot(category, idPlot, idsCtegory) {
  const tableName = `plot_${category}`;
  await idsCtegory.forEach((idCategory) => {
    knex(tableName)
      .insert(idPlot, idCategory);
  });
}

module.exports = {
  getAll,
  getById,
  create,
};
