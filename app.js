const express = require('express');
const app = express();
const cors = require('cors');
const cookieParse = require('cookie-parser');
require('dotenv').config();

const AuthRouter = require('./routes/auth.routes.js')
const PokemonRouter = require('./routes/pokemon.routes.js')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParse())
app.use(cors({
    origin: true,
    credentials: true,
}))

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

// Routing
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/pokemon', PokemonRouter)

app.listen(process.env.API_PORT, () => {
    console.log(`server running in port ${process.env.API_PORT}`)
})