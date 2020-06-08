const db_properties = require('../../db_properties');

const post = (request, response) => {
  const { id_person, id_person2, id_type_relationship, reasons } = request.body;
  console.log(reasons)
  db_properties.pool.query(
    `INSERT INTO relationships ( id_person, id_person2, id_type_relationship, reasons )
     VALUES ($1, $2, $3, $4)`,
    [id_person, id_person2, id_type_relationship, reasons], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`relationship add with ID: ${results.insertId}`)
    }
  );
};

const del = (request, response) => {
  const id = parseInt(request.params.id)

  db_properties.pool.query('DELETE FROM relationships WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Location deleted with ID: ${id}`)
  });
};

const get = (request, response) => {
  db_properties.pool.query(
    `SELECT relationships.id, 
    persons.name as "person_name", persons.sex as "person_sex", persons.age as "person_age", persons.shot_description as "person_description", 
    persons_1.name as "person2_name", persons_1.sex  as "person2_sex", persons_1.age as "person2_age", persons_1.shot_description as "person2_description", 
    type_relationship.name as "type_name", relationships.reasons
    FROM persons AS persons_1 INNER JOIN (type_relationship INNER JOIN 
                        (persons INNER JOIN relationships ON persons.id = relationships.id_person) 
                        ON type_relationship.id = relationships.id_type_relationship) 
                        ON persons_1.id = relationships.id_person2`,
    (error, results) => {
      if (error) { console.log(error.message) }
      response.status(200).json(results.rows);
    }
  )
}

module.exports = {
  del,
  post,
  get,
};
