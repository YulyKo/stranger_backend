const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 8000
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

app.get(`/${db.users.name}`, db.users.get)
app.get('/users/:id', db.users.getById)
app.post('/users', db.users.create)
app.put('/users/:id', db.users.update)
app.delete('/users/:id', db.users.del)

app.get('/plots', db.plots.get)
app.get('/plots/:id', db.plots.getById)
app.post('/plots', db.plots.post)
app.put('/plots/:id', db.plots.update)
app.delete('/plots/:id', db.plots.del)

app.get('/arts', db.arts.get)
app.get('/arts/:id', db.arts.getById)
app.post('/arts', db.arts.post)
app.put('/arts/:id', db.arts.update)
app.delete('/arts/:id', db.arts.del)

app.get('/locations', db.locations.get)
app.get('/locations/:id', db.locations.getById)
app.post('/locations', db.locations.post)
app.put('/locations/:id', db.locations.update)
app.delete('/locations/:id', db.locations.del)

app.get('/persons', db.persons.get)
app.get('/persons/:id', db.persons.getById)
app.post('/persons', db.persons.post)
app.put('/persons/:id', db.persons.update)
app.delete('/persons/:id', db.persons.del)

app.get('/relationships', db.relationships.get)
app.get('/relationships/:id', db.relationships.getById)
app.post('/relationships', db.relationships.post)
app.put('/relationships/:id', db.relationships.update)
app.delete('/relationships/:id', db.relationships.del)

app.get('/type_tag', db.type_tags.get)

app.get('/type_relationships', db.type_relationships.get)
app.get('/type_relationships/:id', db.type_relationships.getById)
app.post('/type_relationships', db.type_relationships.post)

app.get('/art_tag', db.art_tag.get)
app.get('/art_tag/:id', db.art_tag.getByArtId)
app.post('/art_tag', db.art_tag.post)

app.get('/plot_tags', db.plot_tag.get)
app.get('/plot_tags/:id', db.plot_tag.getByIdForPlot)
app.post('/plot_tags', db.plot_tag.post)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

// SELECT * FROM tags WHERE id IN (SELECT id_tag from plot_tag where id_plot = 7);