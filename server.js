const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')
const url = require('url')
const path = require('path')

const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('pokemon.db', (err) => {
    if (err) {
        console.error(err.message)
    } else {
        console.log('Connected to database')
    }
})

let html;

app.get('/', (req, res) => {
    html = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
        <h1>POKEDEX</h1>
        <a href="/view"><button>VIEW</button></a><br>
        <a href="/add"><button>ADD</button></a><br>
        <a href="/update"><button>UPDATE</button></a><br>
        <a href="/delete"><button>DELETE</button></a><br>
    </div>`

    res.send(html)
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