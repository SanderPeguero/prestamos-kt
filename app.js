import express from "express"
import cors from 'cors'

//importamos nuestro enrutador
import ArticulosRouter from './Routes/ArticulosRoute.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use('/', ArticulosRouter)

app.listen(process.env.PORT || 4000, () => {
    console.log('Server Started!')
})
