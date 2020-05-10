const db_propertis = require('../../db_propertis');
const format = require('pg-format');

const postArtWithTags = (request, response) => {
  console.log('i am a live')
  const { author, title, description, url, tags } = request.body;
  db_propertis.pool.query(
    'INSERT INTO arts( author, title, description, url ) VALUES ($1, $2, $3, $4) returning id',
    [ author, title, description, url ], (error, results) => {
      if (error) { throw error }
      if (tags) postTagsByNewArt(results.rows[0].id, tags)
      response.status(201).send(`Art add with tags`)
    }
  );
  console.log('add plot tag');
};

function postTagsByNewArt (id_art, tags) {
  let values = [];
  tags.forEach(id_tag => {
    values.push([id_art, id_tag]);
  })
  const requestString = format(`INSERT INTO art_tag (id_art, id_tag) VALUES %L`, values);
  db_propertis.pool.query( requestString,
    (error) =>  { if (error) { throw error } }
  )
}

const delArtWithTags = (request) => {
  const id = parseInt(request.params.id)
  deleteInfoOfArtById('arts', 'id', id)
  deleteInfoOfArtById('art_tag', 'id_art', id)
};

function deleteInfoOfArtById(nameOfTable, nameOfColumn, id_plot) {
  db_propertis.pool.query(`DELETE FROM ${nameOfTable} WHERE ${nameOfColumn} = $1;`, [id_plot], (error) => {
    if (error) {
      throw error
    }
  });
}

module.exports = {
  postArtWithTags,
  delArtWithTags,
}
