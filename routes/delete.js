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