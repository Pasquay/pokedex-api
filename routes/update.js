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

router.get('/updateForm/:name', (req, res) => {
    const name = req.params.name
    sql = `SELECT * FROM pokemon WHERE Name='${name}'`

    db.get(sql, (err, row) => {
        if (err) {
            return res.json({
                status: 400, 
                success: false
            })
        } 
        
        if (!row) {
            return res.json({
                status: 404,
                success: false,
                error: `Pokemon not found!`
            })
        }
        res.render('update', {
            number: row.Number,
            name: row.Name,
            type_1: row.Type_1,
            type_2: row.Type_2,
            generation: row.Generation,
            legendary: row.Legendary,
            total: row.Total,
            hp: row.HP,
            attack: row.Attack,
            defense: row.Defense,
            sp_atk: row.Sp_Atk,
            sp_def: row.Sp_Def,
            speed: row.Speed,
        })
    })
})

router.post('/updateForm/:name', (req, res) => {
    const name = req.params.name;
    sql = `SELECT * FROM pokemon WHERE Name='${name}'`

    db.get(sql, (err, row) => {
        if (err) {
            return res.json({
                status: 400,
                success: false
            })
        }

        if (!row) {
            return res.json({
                status: 404,
                success: false,
                error: "Pokemon not found!"
            })
        }

        const numberValue = req.body.number && req.body.number.trim() !== '' ? req.body.number : row.Number; 
        const nameValue = req.body.name && req.body.name.trim() !== '' ? req.body.name : row.Name;
        const type_1Value = req.body.type_1 && req.body.type_1.trim() !== '' ? req.body.type_1 : row.Type_1;
        const type_2Value = req.body.type_2 && req.body.type_2.trim() !== '' ? req.body.type_2 : row.Type_2;
        const generationValue = req.body.generation && req.body.generation.trim() !== '' ? req.body.generation : row.Generation;
        const legendaryValue = typeof req.body.legendary === 'undefined' ? row.Legendary : req.body.legendary;
        const totalValue = req.body.total && req.body.total.trim() !== '' ? req.body.total : row.Total;
        const hpValue = req.body.hp && req.body.hp.trim() !== '' ? req.body.hp : row.HP;
        const attackValue = req.body.attack && req.body.attack.trim() !== '' ? req.body.attack : row.Attack;
        const defenseValue = req.body.defense && req.body.defense.trim() !== '' ? req.body.defense : row.Defense;
        const sp_atkValue = req.body.sp_atk && req.body.sp_atk.trim() !== '' ? req.body.sp_atk : row.Sp_Atk;
        const sp_defValue = req.body.sp_def && req.body.sp_def.trim() !== '' ? req.body.sp_def : row.Sp_Def;
        const speedValue = req.body.speed && req.body.speed.trim() !== '' ? req.body.speed : row.Speed;

        sql = `UPDATE pokemon SET 
        Number=?, 
        Name=?, 
        Type_1=?, 
        Type_2=?, 
        Total=?, 
        HP=?, 
        Attack=?, 
        Defense=?, 
        Sp_Atk=?, 
        Sp_def=?, 
        Speed=?, 
        Generation=?, 
        Legendary=?
        WHERE Name=?`;

        const params = [
            numberValue, 
            nameValue, 
            type_1Value, 
            type_2Value, 
            totalValue, 
            hpValue, 
            attackValue, 
            defenseValue, 
            sp_atkValue, 
            sp_defValue, 
            speedValue,
            generationValue, 
            legendaryValue, 
            name
        ];

        db.run(sql, params, (err) => {
            if (err) {
                console.error(err)
                return res.json({
                    status: 400,
                    success: false
                })
            } else {
                console.log(`Updated Pokemon: ${nameValue}`)
                return res.json({
                    status: 200,
                    success: true,
                    message: `Updated Pokemon: ${nameValue}`
                })
            }
        })
    })
})

router.get('/:id', (req, res) => {
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
                        <td><a href='/update/updateForm/${row.Name}'><button>Edit</button></a></td>
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
                        <td><a href='/update/${row.Number}'><button">Edit</button></a></td>
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



module.exports = router;