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

router.post('/:name', (req, res) => {
    sql = `DELETE FROM pokemon WHERE Name = '${req.params.name}'`

    db.run(sql, (err) => {
        if (err) {
            return res.json({
                status: 400,
                success: false
            })
        }

        return res.json({
            status: 200,
            success: true,
            message: `Deleted Pokemon: ${req.params.name}`
        })
    })
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

            html += 
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
                        <td>
                            <form action='/delete/${row.Name}' method='POST'>
                                <button>
                                    DELETE
                                </button>
                            </form>
                        </td>
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



module.exports = router;