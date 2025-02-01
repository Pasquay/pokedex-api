const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('pokemon.db', (err) => {
    if (err) {
        console.error(err.message)
    } else {
        console.log('Connected to database')
    }
})

app.get('/', (req, res) => {
    res.send(`Homepage <br>
    Homepage welcome text<br>
    Buttons row 1 for:<br>
    Add pokemon<br>
    Edit pokemon<br>
    Delete pokemon<br>
    Buttons row 2 for:<br>
    Search<br>
    View list -> /view<br>
    View entry #1 -> /view/:id`)
})


const viewRouter = require('./routes/view')
app.use('/view', viewRouter)

const addRouter = require('./routes/add')
app.use('/add', addRouter)

const updateRouter = require('./routes/update')
app.use('/update', updateRouter)

const deleteRouter = require('./routes/delete')
app.use('/delete', deleteRouter)


const port = 3000
app.listen(3000, () => {
    console.log('Server hosted to http://localhost:3000')
})