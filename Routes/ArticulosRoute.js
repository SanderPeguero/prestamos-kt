import express from "express"
import { 
    Create,
    Read,
    Delete,
    ReadAll, 
    Update
} from '../BLL/Articulos.js'

const router = express.Router()

// //Create and Update
// router.post('/', saveInstance)

// //Update
// router.put('/:id', saveInstance) 

// //Read
// router.get('/:id', findInstance) 

// //Delete
// router.delete('/:id', deleteInstance) 

// //List
// router.get('/', listInstances) 


//Create
router.post('/', Create)

//Update
router.put('/:id', Update) 

//Read
router.get('/:id', Read) 

//Delete
router.delete('/:id', Delete) 

//List
router.get('/', ReadAll) 

export default router