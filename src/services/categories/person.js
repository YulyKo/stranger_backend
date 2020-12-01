const { knex } = require('../../db');

const getAllForPlots = async () => {
  const persons = await knex('plot_person')
    .select(
      'plot_person.id_plot',
      'persons.id',
      'persons.name',
    )
    .leftJoin('persons', { 'persons.id': 'plot_person.id_person' });
    return persons;
};

module.exports = {
  getAllForPlots,
};