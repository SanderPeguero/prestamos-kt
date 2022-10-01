import express from "express"
import { 
    saveInstance,
    findInstance,
    deleteInstance,
    listInstances 
} from '../BLL/ArticulosBLL.js'

const router = express.Router()

//Create and Update
router.put('/', saveInstance) 
//Read
router.get('/:id', findInstance) 
//Delete
router.delete('/:id', deleteInstance) 
//List
router.get('/', listInstances) 

export default router