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

module.exports = {
  getAllForPlots,
};
