const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send(`List of pokemon with sorting features <br>
    Buttons row 1 for:<br>
    Add pokemon<br>
    Edit pokemon<br>
    Delete pokemon<br>
    Buttons row 2 for:<br>
    Search<br>
    View list<br>
    View entry #1`)
})

router.get('/:id', (req, res) => {
    res.send(`Pokedex entry for pokemon: ${req.params.id} <br>
    Buttons row 1 for:<br>
    Add pokemon<br>
    Edit pokemon<br>
    Delete pokemon<br>
    Buttons row 2 for:<br>
    Search<br>
    View list<br>
    View entry #1`)
})


module.exports = router