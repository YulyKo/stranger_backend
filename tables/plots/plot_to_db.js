const db_propertis = require('../../db_properties');
const format = require('pg-format');

const post = (request, response) => {
  const { author, title, text, description, id_locations, id_persons, id_tags } = request.body;
  db_propertis.pool.query(
    'INSERT INTO plots( author, title, text, description ) VALUES ($1, $2, $3, $4) RETURNING id',
    [author, title, text, description], (error, results) => {
      if (error) { console.log(error.message) }
      const id_plot = results.rows[0].id;
      if (typeof id_locations[0] === 'number') {
        postLocations(id_plot, id_locations);
      }
      if (typeof id_persons[0] === 'number') {
        postPersons(id_plot, id_persons)
      }
      if (typeof id_tags[0] === 'number') {
        postTags(id_plot, id_tags)
      }
      response.status(200);
    }
  );
}
function postTags(id_plot, id_tags) {
  let ids = [];
  id_tags.forEach(id => {
    ids.push([id_plot, id]);
  })
  const requestString = format('INSERT INTO plot_tag( id_plot, id_tag ) VALUES %L', ids);
  db_propertis.pool.query(requestString, (error) => {
    if (error) { console.log(error.message) }
    }
  );
}

function postLocations(id_plot, id_locations) {
  let ids = [];
  id_locations.forEach(id => {
    ids.push([id_plot, id]);
  })
  const requestString = format('INSERT INTO plot_location( id_plot, id_location ) VALUES %L', ids);
  db_propertis.pool.query( requestString, (error) => {
    if (error) { console.log(error.message) }
    }
  );
}

function postPersons(id_plot, id_persons) {
  let ids = [];
  id_persons.forEach(id => {
    ids.push([id_plot, id]);
  })
  const requestString = format(
    'INSERT INTO plot_person( id_plot, id_person ) VALUES %L',
    ids);
  db_propertis.pool.query(requestString, (error) => {
    if (error) { console.log(error.message) }
    }
  );
}

module.exports = {
  post,
}
