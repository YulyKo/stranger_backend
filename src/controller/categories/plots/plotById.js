/* eslint-disable no-unused-vars */
const logger = require('../../../utils/logger')(__filename);
const createError = require('http-errors');
const { categories: { plot, tag, location, person } } = require('../../../services');


let resultJSON = {
  'plot': {
    'data': {
      'title': '',
      'description': '',
      'text': '',
      'author': ''
    },
    'tags': [],
    'locations': [],
    'persons': [],
  }
};

const getPlotWithTagsAndLocationsById = (request, response) => {
  const id = parseInt(request.params.id);
  getPlotInfoById(id, response);
};
  
async function getPlotInfoById(id, response) {
  const plotInfo = await plot.getById(id);
  comparePlotToJSON(plotInfo);
  getTagsByPlotId(id, response);
}
  
async function getTagsByPlotId(id, response) {
  const tags = await tag.getForPlot(id);
  if(tags !== []) compareTagsToJSON(tags);
  getPersonsByPlotId(id, response);
}
  
async function getPersonsByPlotId(id, response) {
  const persons = await person.getForPlot(id);
  if(persons !== []) comparePersonsToJSON(persons);
  getLocationsByPlotId(id, response);
}
  
async function getLocationsByPlotId(id, response) {
  const locations = await location.getForPlot(id);
  if(locations !== []) compareLocationsToJSON(locations);
  response.status(200).send(resultJSON);  
  cleaupObject(response);
}
  
function cleaupObject(response) {
  response.on('finish', () => {
    resultJSON = {
      'plot': {
        'data': {
          'title': '',
          'description': '',
          'text': '',
          'author': ''
        },
        'tags': [],
        'locations': [],
        'persons': [],
      }
    };
  });
}

function comparePlotToJSON(data) {
  resultJSON.plot.data.title = data.title;
  resultJSON.plot.data.author = data.author;
  resultJSON.plot.data.description = data.description;
  resultJSON.plot.data.text = data.text;
}
  
function comparePersonsToJSON(data) {
  for (let i = 0; i < data.length; i++) {
    let item = {
      'id': data[i].id,
      'name': data[i].name
    };
    resultJSON.plot.persons.push(item);
  }
}
  
function compareLocationsToJSON(data) {
  for (let i = 0; i < data.length; i++) {
    let item = {
      'id': data[i].id,
      'name': data[i].name,
      'photo_url': data[i].photo_url,
      'author': data[i].author
    };
    resultJSON.plot.locations.push(item);
  }
}
  
function compareTagsToJSON(data) {
  for (let i = 0; i < data.length; i++) {
    let item = {
      'id': data[i].id,
      'name': data[i].name,
      'bg_color': data[i].bg_color,
      'text_color': data[i].text_color
    };
    resultJSON.plot.tags.push(item);
  }
}

const get = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    logger.info(`get plot by id ${id}`);
    getPlotInfoById(id, res);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error.message));
  }
};

module.exports = {
  get,
};
