const db_propertis = require('./../db_propertis');

const name = 'plots';

const post = (request, response) => {
    const { author, title, text, description, id_location, id_person } = request.body;
    db_propertis.pool.query(
        'INSERT INTO plots( author, title, text, description) VALUES ($1, $2, $3, $4) returning id',
        [author, title, text, description], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results);
            add(results.rows[0].id, id_location, id_person, response);
            response.status(200);
        }
    );
}

// function getPLotMaxId() {
//     let data;
//   db_propertis.pool.query(
//     'select max(id) from plots', (error, result) => {
//       if (error) {
//         throw error
//       }
//       console.log(result.rows[0].max + ' from get plot max id');
//
//           // return +result.rows[0].max;
//       data = +result.rows[0].max;
//     }
//   );
//   return data;
// }

function add(id_plot, id_location, id_person, response) {
  // let id_plot = getPLotMaxId();
  // console.log(id_plot);

  if (id_location) {
    db_propertis.pool.query(
      'INSERT INTO plot_location( id_plot, id_location) VALUES ($1, $2)',
      [id_plot, id_location], (error) => {
        if (error) {
          throw error
        }
        response.status(201).send(`Plot location added`)
      }
    );
  }

  if (id_person) {
    console.log(id_plot + ' from if');
    
    db_propertis.pool.query(
      'INSERT INTO plot_person( id_plot, id_person) VALUES ($1, $2)',
      [id_plot, id_person], (error) => {
        if (error) {
          throw error
        }
        console.log('all is okay')
      }
    );
  }
  console.log('add plot');
};

const del = (request, response) => {
  const id = parseInt(request.params.id)

  db_propertis.pool.query('DELETE FROM plots WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
  });
};

const update = (request, response) => {
  const id = parseInt(request.params.id)
  const { author, title, text, id_location, id_person } = request.body
// author, title, text, id_location, id_person
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
  del,
  post,
}
