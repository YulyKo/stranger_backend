const db_propertis = require('./../db_propertis');

const name = 'plot_width_tags';

const getPlotWidthTags = (request, responce) => {
    console.log('get plots width tags');
    
    db_propertis.pool.query("")
};

module.exports = {
    name,
};

// select * from tags left join plot_tag on plot_tag.id_tag = tags.id left join plots on plots.id = plot_tag.id_plot where plot_tag.id_plot IS NOT null;
// для отимання даних сценаріїв через теги

/*select * from plots left join plot_tag on plot_tag.id_tag = plots.id left join tags on plot_tag.id_tag = tags.id;
*/
// додай трохи правок і буде те саме але навпаки від попереднього запиту
