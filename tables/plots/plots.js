const db_propertis = require('../../db_propertis');
const format = require('pg-format');

const name = 'plots';

const post = (request, response) => {
    const { author, title, text, description, id_locations, id_persons, id_tags } = request.body;
    db_propertis.pool.query(
        'INSERT INTO plots( author, title, text, description) VALUES ($1, $2, $3, $4) returning id',
        [author, title, text, description], (error, results) => {
            if (error) {
                throw error
            }
            const id_plot = results.rows[0].id;
            if (id_locations) {
                postLocations(id_plot, id_locations)
            }
            if (id_persons) {
                postPersons(id_plot, id_persons)
            }
            if (id_tags) {
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
    const requestString = format('INSERT INTO plot_tag( id_plot, id_tag) VALUES %L', ids);
    db_propertis.pool.query(requestString, (error) => {
            if (error) { throw error }
        }
    );
    console.log('add plot`s tag');
}

function postLocations(id_plot, id_locations) {
    console.log('postLocation')
    let ids = [];
    id_locations.forEach(id => {
        ids.push([id_plot, id]);
    })
    const requestString = format('INSERT INTO plot_location( id_plot, id_location) VALUES %L', ids);
    db_propertis.pool.query( requestString, (error) => {
            if (error) {
                throw error
            }
        }
    );
}

function postPersons(id_plot, id_persons) {
    console.log('postPerson')
    let ids = [];
    id_persons.forEach(id => {
        ids.push([id_plot, id]);
    })
    const requestString = format('INSERT INTO plot_person( id_plot, id_person) VALUES %L', ids);
    db_propertis.pool.query(requestString, (error) => {
            if (error) {
                throw error
            }
        }
    );
}

const update = (request, response) => {
  const id = parseInt(request.params.id)
  const { author, title, text, id_location, id_person } = request.body
  db_propertis.pool.query(
    'UPDATE plots SET author = $1, title = $2, text = $3, id_location = $4, id_person = $5 WHERE id = $6',
    [author, title, text, id_location, id_person, id],
    (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const get = (request, response) => {
  console.log('get plots');

  db_propertis.pool.query('SELECT * FROM plots', (error, results) => {
    if(error) { throw error }
    response.status(200).json(results.rows)
  });
};

const getById = (request, response) => {
  console.log('get by id');

  const id = parseInt(request.params.id);
  db_propertis.pool.query('SELECT * FROM plots WHERE id = $1', [id], (error, result) => {
      if (error) { throw error }
      response.status(200).json(result.rows);
  });
};

module.exports = {
  name,
  get,
  getById,
  update,
  post,
}
