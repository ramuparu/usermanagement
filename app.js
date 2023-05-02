const dotenv = require('dotenv')

const express = require('express')
const methodOverride = require('method-override')
const {flash} = require('express-flash-message')
const session = require('express-session')
const expressLayout = require('express-ejs-layouts')
const customerRouter = require('./server/routes/customerRoutes')
const connectDB = require('./config/connection')
dotenv.config({ path: './config/config.env' })

const app = express()

const PORT = 5000 || process.env.PORT
connectDB()
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(methodOverride('_method'));
app.use(express.static('public'))

app.use(session(
    {
        secret : 'secret',
        resave : false,
        saveUninitialized : true,
        cookie : {
            maxAge : 1000 * 60 * 60 * 24 * 7
        }
    }
))

app.use(flash({
    sessionKeyName : 'flashMessage'
}))

app.use(expressLayout)
app.set('layout','./layouts/main')
app.set('view engine','ejs')



app.use('/',customerRouter)

app.get('*',(req,res)=>{
    res.status(404).render('404')
})

app.listen(PORT,()=>{
    console.log(`server running on port${PORT}`)
})