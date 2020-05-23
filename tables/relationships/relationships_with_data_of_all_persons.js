const db_properties = require('../../db_properties');

let responseJSON = []
let idsPerson2 = []

function writeFirstPersonToResultJSON(data) {
  for (let index = 0; index < data.length; index++) {
    let item = {
      person1: {
        id: data[index].id,
        name: data[index].name,
        age: data[index].age,
        sex: data[index].sex,
        shot_description: data[index].shot_description,
        type_relationship: data[index].type_relationship,
        reasons: data[index].reasons,
      },
      person2: {
        id: data[index].id_person2
      }
    }
    idsPerson2.push(data[index].id_person2)
    responseJSON.push(item)
  }
}

function writeSecondPersonToResultJSON(person2) {
  for (let res_index = 0; res_index < responseJSON.length; res_index++) {
    responseJSON[res_index].person2 = {
      id: person2.id,
      name: person2.name,
      age: person2.age,
      sex: person2.sex,
      shot_description: person2.shot_description,
      type_relationship: person2.type_relationship,
      reasons: person2.reasons,
    }
  }
  console.log(responseJSON)
}

function checkSecondPersonInfo(response) {
  for (let index = 0; index < idsPerson2.length; index++) {
    getAllDataOfSecondPersonById(idsPerson2[index])
  }
  response.status(200).json(responseJSON);
}

function getAllDataOfSecondPersonById(id) {
  db_properties.pool.query(
    `2`, [id],
    (error, results) => {
      if (error) { throw error }
      if (results.rows[0]) {
        console.log(results.rows[0])
        writeSecondPersonToResultJSON(results.rows[0])
      }
    }
  )
}

function getAllDataOfFirstPerson(request, response) {
  db_properties.pool.query(
    `SELECT persons.id, persons.name, persons.age, persons.sex, persons.shot_description, 
    type_relationship.name as "type_relationship", relationships.id_person2, relationships.reasons FROM persons 
    LEFT JOIN relationships ON persons.id = relationships.id_person left join type_relationship on relationships.id_type_relationship = type_relationship.id
    WHERE relationships.id_person2 IS NOT NULL`,
    (error, results) => {
      if (error) { throw error }
      writeFirstPersonToResultJSON(results.rows)
    }
  )
  checkSecondPersonInfo(response)
}

const get = (response) => {
  getAllDataOfFirstPerson(response);
}

module.exports = {
  get
}
