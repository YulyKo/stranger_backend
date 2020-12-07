const { knex } = require('../../db');

const getAll = async () => {
  return await knex()
    .select(
      'relationships.id',
      'person_1.name as "person1.name',
      'person_1.sex as "person1.sex',
      'person_1.age as "person1.age',
      'person_1.shot_description as "person1.description',
      'person_2.name as "person2.name',
      'person_2.sex as "person2.sex',
      'person_2.age as "person2.age',
      'person_2.shot_description as "person2.description',
      'type_relationship.name as "type_name"',
      'relationships.reasons'
    )
    .from('relationships')
    .innerJoin({ person_1: 'persons' }, 'relationships.id_person', 'person_1.id')
    .innerJoin({ person_2: 'persons' }, 'relationships.id_person2', 'person_2.id')
    .innerJoin('type_relationship', 'type_relationship.id' , 'relationships.id_type_relationship');
};

module.exports = {
  getAll,
};
