const db_properties = require('../db_properties');

function deleteInfoOfSmthById(nameOfTable, nameOfColumn, id) {
  db_properties.pool.query(`DELETE FROM ${nameOfTable} WHERE ${nameOfColumn} = $1;`, [id], (error) => {
    if (error) {
      throw error
    }
  });
}

module.exports = {
  deleteInfoOfSmthById,
}