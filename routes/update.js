/*TO ADD
1. edit ejs page
2. router.get('/edit/:id')*/

const express = require('express')
const router = express.Router()
const url = require('url')
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('pokemon.db', (err) => {
    if (err) {
        return res.json({
            status: 400,
            success: false
        })
    }
})
let sql, html;

router.get('/', (req, res) => {
    // Search to find what pokemon you want to edit with a list of results<br>
    // Buttons row 1 for:<br>
    // Add pokemon<br>
    // Edit pokemon<br>
    // Delete pokemon<br>
    // Buttons row 2 for:<br>
    // Search<br>
    // View list<br>
    // View entry #1

    sql = `SELECT * FROM pokemon ORDER BY Number`
    try {
        db.all(sql, (err, rows) => {
            if (err) {
                return res.json({
                    status: 400,
                    success: false
                })
            }

            if (rows.length < 1){
                return res.json({
                    status: 400,
                    success: false,
                    error: 'Pokedex is empty!'
                })
            }

            html = 
                `<table border='1'>
                    <tr>
                        <th>EDIT</th>
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
                        <td><a href='/update/${row.Number}'><button>Edit</button></a></td>
                        <td>${row.Number}</td>
                        <td>${row.Name}</td>
                        <td>${row.Type_1}</td>
                        <td>${row.Type_2}</td>
                        <td>${row.Total}</td>
                        <td>${row.HP}</td>
                        <td>${row.Attack}</td>
                        <td>${row.Defense}</td>
                        <td>${row.Sp_Atk}</td>
                        <td>${row.Sp_Def}</td>
                        <td>${row.Speed}</td>
                        <td>${row.Generation}</td>
                        <td>${row.Legendary}</td>
                    </tr>`
            })

            html += `</table>`

            return res.send(html)
        })
    } catch (err){
        return res.json({
            status: 400,
            success: false,
        })
    }
})

router.get('/:id', (req, res) => {
    // Edit pokemon: ${req.params.id}<br>
    // Buttons row 1 for:<br>
    // Add pokemon<br>
    // Edit pokemon<br>
    // Delete pokemon<br>
    // Buttons row 2 for:<br>
    // Search<br>
    // View list<br>
    // View entry #1

    sql = `SELECT * FROM pokemon WHERE Number=${req.params.id}`
    db.all(sql, (err, rows) => {
        try {
            if (err){
                return res.json({
                    status: 400,
                    success: false
                })
            }
    
            if (rows.length < 1) {
                return res.json({
                    status: 400,
                    success: false,
                    
                })
            }

            html = 
                `<table border='1'>
                    <tr>
                        <th>EDIT</th>
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
                        <td><a href='/${row.Number}'><button>Edit</button></a></td>
                        <td>${row.Number}</td>
                        <td>${row.Name}</td>
                        <td>${row.Type_1}</td>
                        <td>${row.Type_2}</td>
                        <td>${row.Total}</td>
                        <td>${row.HP}</td>
                        <td>${row.Attack}</td>
                        <td>${row.Defense}</td>
                        <td>${row.Sp_Atk}</td>
                        <td>${row.Sp_Def}</td>
                        <td>${row.Speed}</td>
                        <td>${row.Generation}</td>
                        <td>${row.Legendary}</td>
                    </tr>`
            })

            html += `</table>`

            res.send(html)

        } catch (err) {
            return res.json({
                status: 400,
                success: false
            })
        }
    })
})



module.exports = router;