const express = require('express')
const app = express()

const mysql = require('mysql')

const bodyParser = require('body-parser')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sab_form'
})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('conectado ao mysql')
})

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extend: false}))

app.get('/', (req, res) => {
    res.render('form')
})
app.post('/adduser', (req, res) =>{
    const { form_name, form_email } = req.body
    let sql = "INSERT INTO users (nome, email) VALUES (?,?)"
    db.query(sql, {form_name, form_email}, (err, result) =>{
        if(err) {
           throw err
        }
        console.log('usuário adicionado', result)
        res.redirect('/users', (req, res) => {
            if (err) {
                throw err
            }
            res.render('/users')
        })
    })
})

app.listen(3000, () =>{
    console.log('servidor aberto')
})