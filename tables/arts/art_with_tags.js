const db_propertis = require('../../db_properties');
const format = require('pg-format');

const postArtWithTags = (request, response) => {
  console.log('i am a live')
  const { author, title, description, url, tags } = request.body;
  if (tags !== []) console.log(tags)
  db_propertis.pool.query(
    'INSERT INTO arts( author, title, description, url ) VALUES ($1, $2, $3, $4) returning id',
    [ author, title, description, url ], (error, results) => {
      if (error) { console.log(error.message) }
      if (tags !== []) postTagsByNewArt(results.rows[0].id, tags)
      response.status(201).send(`Art add with tags`)
    }
  );
  console.log('add plot tag');
};

function postTagsByNewArt(id_art, tags) {
  let values = [];
  tags.forEach(id_tag => {
    values.push([id_art, id_tag]);
  })
  const requestString = format(`INSERT INTO art_tag (id_art, id_tag) VALUES %L`, values);
  db_propertis.pool.query( requestString,
    (error) =>  { if (error) { console.log(error.message) } }
  )
}

const delArtWithTags = (request) => {
  console.log('del art with tags')
  const id = parseInt(request.params.id)
  deleteTagOfArtById(id)
};

function deleteTagOfArtById(id_art) {
  db_propertis.pool.query(`DELETE FROM art_tag WHERE id_art = $1;`, [id_art], (error) => {
    if (error) {
      throw error
    }
    deleteArtById(id_art)
  });
}

function deleteArtById(id_art) {
  db_propertis.pool.query(`DELETE FROM arts WHERE id = $1;`, [id_art], (error) => {
    if (error) {
      throw error
    }
  });
}

let artsJSON = []

function compareArtTagsToJSON(tags) {
  for (let index_art = 0; index_art < artsJSON.length; index_art++) {
    for (let index_tag = 0; index_tag < tags.length; index_tag++) {
      if (+artsJSON[index_art].data.id === +tags[index_tag].id_art) {
        let item = {
          "id": tags[index_tag].id,
          "name": tags[index_tag].name,
          "bg_color": tags[index_tag].bg_color,
          "text_color": tags[index_tag].text_color,
        };
        artsJSON[index_art].tags.push(item)
      }
    }
  }
}

function compareArtInfoToJSON(arts) {
  for (let index = 0; index < arts.length; index++) {
    artsJSON[index] = { // for all info
      "data": { //info for one
        "id": arts[index].id,
        "title": arts[index].title,
        "url": arts[index].url,
      },
      tags: [],
    }
  }
}

function getArtTags(response) {
  db_propertis.pool.query(
    `SELECT art_tag.id_art, tags.id, tags.name, tags.bg_color, tags.text_color 
     FROM art_tag LEFT JOIN tags ON tags.id = art_tag.id_tag`,
    (error, result) => {
      if (error) { throw error }
      compareArtTagsToJSON(result.rows)
      response.status(200).json(artsJSON)
  });
}

const getArtWithTags = (request, response) => {
  console.log('get arts with tags');
  db_propertis.pool.query('SELECT id, title, url FROM arts', (error, results) => {
    if(error) throw error
    compareArtInfoToJSON(results.rows)
    getArtTags(response)
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

function compareTagsByArtId(tags) {
  for (let index_tag = 0; index_tag < tags.length; index_tag++) {
    let item = {
      "id": tags[index_tag].id,
      "name": tags[index_tag].name,
      "bg_color": tags[index_tag].bg_color,
      "text_color": tags[index_tag].text_color,
    }
    artJSON.tags.push(item)
  }
}

function getTagsByArtId(response, id_art) {
  db_propertis.pool.query(
    `SELECT tags.id, tags.name, tags.bg_color, tags.text_color 
     FROM art_tag LEFT JOIN tags ON tags.id = art_tag.id_tag where art_tag.id_art = $1`,
    [id_art], (error, result) => {
      if (error) { throw error }
      compareTagsByArtId(result.rows)
      console.log(artJSON)
      response.status(200).json(artJSON);
    }
  )
}

const getByIdWithTags = (request, response) => {
  console.log('get art by id');
  const id = parseInt(request.params.id);
  db_propertis.pool.query('SELECT * FROM arts WHERE id = $1', [id], (error, result) => {
    if (error) { throw error }
    compareArtJSON(result.rows[0])
    getTagsByArtId(response, id)
  });
};

module.exports = {
  postArtWithTags,
  delArtWithTags,
  getArtWithTags,
  getByIdWithTags,
}
