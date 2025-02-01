const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.send(`Form with data to fill up to add new pokemon<br>
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