const plot_to_db = require('./tables/plots/plot_to_db');
const users = require('./tables/users');
const locations = require('./tables/locations');
const tags = require('./tables/tags');
const relationships = require('./tables/relationships/relationships');
const type_relationships = require('./tables/relationships/type_relationship');
const art_with_tags = require('./tables/art_with_tags');
const persons = require('./tables/persons');
const plots_with_tags_persons_locations = require('./tables/plots/plots_with_tags_locations_persons');
const plot_by_id_with_tags_persons_locations = require('./tables/plots/plot_by_id_with_tags_locations_persons');
const team = require('./tables/team');

module.exports = {
  users,
  locations,
  tags,
  relationships,
  persons,
  type_relationships,
  art_with_tags,
  plot_to_db,
  plots_with_tags_persons_locations,
  plot_by_id_with_tags_persons_locations,
  team,
}
