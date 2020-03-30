// const db_propertis = require('./db_propertis');


// // TODO упростити


// const postPlotAndTag = (request, response) => {
//     const { id_plot, id_tag } = request.body;
//     db_propertis.pool.query(
//         'INSERT INTO plot_tag( id_plot, id_tag ) VALUES ($1, $2)',
//         [ id_plot, id_tag ], (error, results) => {
//             if (error) {
//                 throw error
//             }
//             response.status(201).send(`Art add with ID: ${results.insertId}`)
//         }
//     );
//     console.log('add plot to tag');
// };

// const postRelationshipAndTag = (request, response) => {
//     const { id_relationchip, id_tag } = request.body;
//     db_propertis.pool.query(
//         'INSERT INTO relationship_tag( id_relationchip, id_tag ) VALUES ($1, $2)',
//         [ id_relationchip, id_tag ], (error, results) => {
//             if (error) {
//                 throw error
//             }
//             response.status(201).send(`Art add with ID: ${results.insertId}`)
//         }
//     );
//     console.log('add relationship to tag');
// };

// const postArtAndTag = (request, response) => {
//     const { id_art, id_tag } = request.body;
//     db_propertis.pool.query(
//         'INSERT INTO art_tag( id_art, id_tag ) VALUES ($1, $2)',
//         [ id_art, id_tag ], (error, results) => {
//             if (error) {
//                 throw error
//             }
//             response.status(201).send(`Art add with ID: ${results.insertId}`)
//         }
//     );
//     console.log('add relationship to tag');
// };



// module.exports = {
//     postPlotAndTag,
//     postRelationshipAndTag,
//     postArtAndTag,
// }
