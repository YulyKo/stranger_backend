const { knex } = require('../../db');

const getAllForPlots = async () => {
  const locations = await knex('plot_location')
    .select(
      'plot_location.id_plot',
      'plot_location.id_location',
      'locations.name',
    )
    .leftJoin('locations', { 'locations.id': 'plot_location.id_location' });
    return locations;
};

const getForPlot = async (id) => {
  console.log(id);
  const locations = knex('plot_location')
    .select(
      'locations.id',
      'locations.name',
    )
    .innerJoin('locations', { 'locations.id': 'plot_location.id_location' })
    .where({ 'plot_location.id_plot': id });
  return locations;
};

module.exports = {
  getAllForPlots,
  getForPlot,
};
