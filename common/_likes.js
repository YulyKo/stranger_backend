const db_properties = require("../db_properties")

const categoryName = (table_name) => { return 'user_likes_' + table_name.substring(0, table_name.length-1) }

function update_likes (table_name, likes, id) {
  db_properties.pool.query(
    `UPDATE ${table_name} SET likes = $1 WHERE id = $2;`, [likes, id],
    (error) => {
      if (error) {
        throw error
      }
    }
  );
  console.log('after query');
}

function insert_users_like(categoryName, user_login, id) {
    db_properties.pool.query(
        `INSERT INTO ${categoryName}(user_login, plot_id) VALUES ($1, $2)`, [user_login, id],
        (error, response) => {
            if (error) {
                throw error
            }
        }
    );
}

module.exports = {
    update_likes,
    insert_users_like,
    categoryName
};
