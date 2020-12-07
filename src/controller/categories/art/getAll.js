const logger = require('../../../utils/logger')(__filename);
const createError = require('http-errors');
const { categories: { art } } = require('../../../services');

// function createStructureForResultArray() {
//   return {
//     title: '',
//     description: '',
//     author: '',
//     url: '',
//     tags: []
//   };
// }

// function compareResultArray(resultArray, res) {
//   const result = [];
//   resultArray.forEach(art => {
//     art = {
//       title: '',
//       description: '',
//       author: '',
//       url: '',
//       tags: []
//     };
//     const existWithTag = result.find(addedArt => {
//       if (addedArt) {
//         return addedArt.data.id === art.data.id;
//       }
//     });
//     if (existWithTag) {
//       existWithTag.tags.push(art.tags);
//       return;
//     }
//     result.push(art);
//   });
// }


// const newResults = [];

// result.forEach(object => {
//   const existedObj = newResults.find(obj => {
//     return obj.id === object.id;
//   });
//   if (existedObj) {
//     existedObj.tags.push(object.tags);
//     return;
//   }
//   newResults.push(object);
// });

// запит за філософією "додай нове, онови додане"
// як зробити хз, те що є я не викупаю
function compareResultArray(result) {
  const newResults = [];

  result.forEach(object => {
    const existedObj = newResults.find((obj) => {
      logger.info(obj);
      if (obj.id === object.id_art) {
        obj.tags.push({
          id: object.id_tag,
          name: object.name,
          text_color: object.text_color,
          bg_color: object.bg_color
        });
      } else {
        // here error push
        obj = {
          id: object.id_art,
          title: object.title,
          author: object.author,
          url: object.url,
          likes: object.likes,
          tags: [],
        };
      }
      return obj;
    });
    newResults.push(existedObj);
  });
  return newResults;
}


const get = async (req, res, next) => {
  try {
    const resultArray = await art.getAll();
    const arts = compareResultArray(resultArray);
    res.status(200).send(arts);
  } catch (error) {
    logger.error(error.message);
    next(createError(500, error));
  }
};

module.exports = {
  get,
};
