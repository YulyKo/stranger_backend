const db_properties = require('../db_properties');
const _by_id = require('../common/_by_id')
const format = require('pg-format');

const postArtWithTags = (request, response) => {
  const { author, title, description, url, tags } = request.body;
  db_properties.pool.query(
    'INSERT INTO arts( author, title, description, url ) VALUES ($1, $2, $3, $4) RETURNING id',
    [ author, title, description, url ], (error, results) => {
      if (error) { console.log(error.message) }
      if (tags !== []) postTagsByNewArt(results.rows[0].id, tags)
      response.status(201).send(`Art add with tags`)
    }
  );
};

function postTagsByNewArt(id_art, tags) {
  let values = [];
  tags.forEach(id_tag => {
    values.push([id_art, id_tag]);
  })
  const requestString = format(`INSERT INTO art_tag (id_art, id_tag) VALUES %L`, values);
  db_properties.pool.query( requestString,
    (error) =>  { if (error) { console.log(error.message) } }
  )
}

const delArtWithTags = (request) => {
  const id = parseInt(request.params.id)
  _by_id.deleteInfoOfSmthById('art_tag', 'id_art', id)
  _by_id.deleteInfoOfSmthById('arts', 'id', id)
};

let artsJSON = []

const getArts = (request, response) => {
  db_properties.pool.query('SELECT id, title, url FROM arts', (error, results) => {
    if(error) { console.log(error.message) }
    response.status(200).json(results.rows)
  });
};

artJSON = {
  title: "",
  description: "",
  author: "",
  url: "",
  tags: []
}

function compareArtJSON(plotData) {
  artJSON.title = plotData.title
  artJSON.description = plotData.description
  artJSON.author = plotData.author
  artJSON.url = plotData.url
}

function getTagsByArtId(response, id_art) {
  db_properties.pool.query(
    `SELECT tags.id, tags.name, tags.bg_color, tags.text_color 
     FROM art_tag LEFT JOIN tags ON tags.id = art_tag.id_tag where art_tag.id_art = $1`,
    [id_art], (error, result) => {
      if (error) { console.log(error.message) }
      artJSON.tags = result.rows
      response.status(200).json(artJSON);
    }
  )
}

const getByIdWithTags = (request, response) => {
  const id = parseInt(request.params.id);
  db_properties.pool.query('SELECT * FROM arts WHERE id = $1', [id], (error, result) => {
    if (error) { console.log(error.message) }
    compareArtJSON(result.rows[0])
    getTagsByArtId(response, id)
  });
};

module.exports = {
  postArtWithTags,
  delArtWithTags,
  getArts,
  getByIdWithTags,
}
