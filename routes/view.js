const express = require('express')
const router = express.Router()
const url = require('url')
const sqlite = require('sqlite3').verbose()

const db = new sqlite.Database('pokemon.db')
let sql, html
            

router.get('/', (req, res) => {
    // res.send(`List of pokemon with sorting features <br>
    // Buttons row 1 for:<br>
    // Add pokemon<br>
    // Edit pokemon<br>
    // Delete pokemon<br>
    // Buttons row 2 for:<br>
    // Search<br>
    // View list<br>
    // View entry #1`)
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
                    error: "Pokedex is empty!"
                })
            }

            html = `
                <div class="nav-bar">
                    <h1 style="text-align: center;">POKEDEX</h1>
                    <div class="nav-buttons" style="display: flex; flex-direction: row; justify-content: center; align-items: center; margin: 1rem;">
                        <a href="/view"><button style="margin: 0 4px; padding: 0.4rem 1rem;">VIEW</button></a><br>
                        <a href="/add"><button style="margin: 0 4px; padding: 0.4rem 1rem;">ADD</button></a><br>
                        <a href="/update"><button style="margin: 0 4px; padding: 0.4rem 1rem;">UPDATE</button></a><br>
                        <a href="/delete"><button style="margin: 0 4px; padding: 0.4rem 1rem;">DELETE</button></a><br>
                    </div>
                </div>`

            html += `
                <table border='1'>
                    <tr>
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
                html += `
                    <tr>
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
    } catch (err) {
        return res.json({
            status: 400,
            success: false
        })
    }
})

router.get('/Number/:id', (req, res) => {
    // res.send(`Pokedex entry for pokemon: ${req.params.id} <br>
    // Buttons row 1 for:<br>
    // Add pokemon<br>
    // Edit pokemon<br>
    // Delete pokemon<br>
    // Buttons row 2 for:<br>
    // Search<br>
    // View list<br>
    // View entry #1`)

    sql = `SELECT * FROM pokemon WHERE Number=${req.params.id}`
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
                    status: 404,
                    success: false,
                    error: "Pokemon not found!"
                })
            }

            let html = `
                <table border='1'>
                    <tr>
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
                html += `
                    <tr>
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
    } catch (err) {
        res.json({
            status: 400,
            success: false
        })
    }
})


module.exports = router