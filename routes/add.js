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
let sql, html

router.get('/', (req, res) => {
    res.render('add')
})

router.post('/', (req, res) => {
    sql = `INSERT INTO pokemon (Number, Name, Type_1, Type_2, Total, HP, Attack, Defense, Sp_Atk, Sp_Def, Speed, Generation, Legendary)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    
        const type2Value = req.body.type_2.trim() === '' ? null : req.body.type_2;
    
        const params = [
        req.body.number,
        req.body.name,
        req.body.type_1,
        type2Value,
        req.body.total,
        req.body.hp,
        req.body.attack,
        req.body.defense,
        req.body.sp_atk,
        req.body.sp_def,
        req.body.speed,
        req.body.generation,
        req.body.legendary
    ]

    db.run(sql, params, (err) => {
        if (err) {
            res.json({
                status: 200,
                success: false,
                message: err.message
            })
        } else {
            res.json({
                status: 200,
                success: true
            })
        }
    })
})



module.exports = router;