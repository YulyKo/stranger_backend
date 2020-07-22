const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = process.env.PORT || 8000
const cors = require('cors')

app.use(cors());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users_with_hash', db.users.getWithHash)
app.post('/users', db.users.create)

app.post('/plots', db.plot_to_db.post)
app.delete('/plots_with_tags_persons_locations/delete/:id', db.plot_by_id_with_tags_persons_locations.deleteWithTagsLocationsPersons)
app.get('/plots_with_tags_persons_locations/:id', db.plot_by_id_with_tags_persons_locations.getPlotWithTagsAndLocationsById)
app.get('/plots_with_tags_persons_locations', db.plots_with_tags_persons_locations.getPlotsWithTagsPersonsAndLocations)

app.get('/arts', db.art_with_tags.getArts)
app.get('/arts/:id', db.art_with_tags.getByIdWithTags)
app.delete('/arts_with_tags/delete/:id', db.art_with_tags.delArtWithTags)
app.post('/arts_with_tags', db.art_with_tags.postArtWithTags)

app.get('/locations', db.locations.get)
app.get('/locations/:id', db.locations.getById)
app.post('/locations', db.locations.post)
app.delete('/locations/:id', db.locations.del)

app.get('/persons', db.persons.get)
app.get('/persons/:id', db.persons.getById)
app.post('/persons', db.persons.post)
app.delete('/persons/:id', db.persons.del)

app.get('/relationships', db.relationships.get)
app.post('/relationships', db.relationships.post)
app.delete('/relationships/:id', db.relationships.del)

app.get('/type_relationships', db.type_relationships.get)
app.post('/type_relationships', db.type_relationships.post)
app.delete('/type_relationships/:id', db.type_relationships.del)

app.get('/tags/:type', db.tags.getByTypeName)
app.delete('/tags/delete/:id&:id_type', db.tags.deleteById)
app.post('/tags', db.tags.post)

app.get('/team', db.team.get)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
