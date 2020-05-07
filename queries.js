const plots = require('./tables/plots/plots');
const users = require('./tables/users');
const arts = require('./tables/arts');
const locations = require('./tables/locations');
const tags = require('./tables/tags');
const relationships = require('./tables/relationships');
const type_relationships = require('./tables/type_relationship');
const type_tags = require('./tables/type_tags');
const art_tag = require('./tables/art_tag');
const persons = require('./tables/persons');
const plot_tag = require('./tables/plots/plot_tag');
const plots_with_tags = require('./tables/plots/plots_with_tags_locations_persons');

module.exports = {
  plots,
  users,
  arts,
  locations,
  tags,
  relationships,
  persons,
  type_relationships,
  type_tags,
  art_tag,
  plot_tag,
  plots_with_tags,
}
