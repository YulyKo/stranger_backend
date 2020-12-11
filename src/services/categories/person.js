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

const getForPlot = async (id) => {
  const persons = await knex('plot_person')
    .select(
      'persons.id',
      'persons.name',
    )
    .leftJoin('persons', { 'persons.id': 'plot_person.id_person' })
    .where({ 'plot_person.id_plot': id });
  return persons;
};

const getAll = async () => {
  return knex('persons');
};

const get = async (id) => {
  return await knex('persons').where({ id });
};

const create = async (newPerson) => {
  await knex('relationships').insert(newPerson);
};

module.exports = {
  getAllForPlots,
  getForPlot,
  getAll,
  get,
  create,
};
