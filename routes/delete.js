const express = require('express')
const router = express.Router()
const url = require('url')
const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('pokemon.db', (err) => {
    if (err) {
        return res.json({
            status: 400,
            success: false
        })
    }
})

router.get('/', (req, res) => {
    sql = `SELECT * FROM pokemon ORDER BY Number`
    try {
        db.all(sql, (err, rows) => {
            if (err) {
                return res.json({
                    status: 400,
                    success: false
                })
            }

            if (rows.length < 1) {
                return res.json({
                    status: 400,
                    success: false,
                    error:  `Pokedex is empty!`
                })
            }

            html = 
                `<table border =1>
                    <tr>
                        <th>DELETE</th>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Type 1</th>
                        <th>Type 2</th>
                        <th>Total</th>
                        <th>HP</th>
                        <th>Attack</th>
                        <th>Defense</th>
                        <th>Sp. Atk</th>
                        <th>Sp. Def</th>
                        <th>Speed</th>
                        <th>Generation</th>
                        <th>Legendary</th>
                    </tr>`
            rows.forEach(row => {
                html += 
                    `<tr>
                        <td>` //continue here
            })
        })
    } catch {

    }
})


module.exports = router;