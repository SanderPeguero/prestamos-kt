import { getInstanceArticulos } from "../Models/ArticulosModel.js"
import { ConnectionStart } from "../DAL/Connection.js"

let Connection = ConnectionStart()
let SQLQuery = "SELECT articuloId, descripcion, marca, existencia FROM Articulos"


//Create
export function Create(req, res){
    
    try{

        const ArticulosModel = getInstanceArticulos(req.body)

        const values = [

            ArticulosModel.articuloId,
            ArticulosModel.descripcion,
            ArticulosModel.marca,
            ArticulosModel.existencia

        ]

        const success = {

            Created: false,
            Instance: null

        }

        if(ArticulosModel.articuloId){

            res.status(400).json("If you know the id with you want to insert the entity try use the PUT method")
            return 
            
        }
        
        if(ArticulosModel.descripcion && ArticulosModel.marca && ArticulosModel.existencia){
           
            Connection = ConnectionStart()

            Connection.query("INSERT INTO Articulos (descripcion, marca, existencia) VALUES (?,?,?)", values, (error, result) => {
                
                if(!error){
                
                    success.Created = true
                    success.Instance = values
                    res.json(success)
                    Connection.destroy()
                
                }else{
                
                    success.Created = false
                    console.log(error)
                    res.status(500).json(success, error)
                    Connection.destroy()
                
                }

            })

        }else{

            res.status(400).json("Can not Create With an Empty Instance or An Instance Value Name is Misswritten")

        }

        
    }catch(error){

        console.log(error)

    }

}

//Update
export function Update(ArticulosModel, res){
   
    try{

        const values = [
    
            ArticulosModel.articuloId,
            ArticulosModel.descripcion,
            ArticulosModel.marca,
            ArticulosModel.existencia
    
        ]

        const success = {
    
            Updated: false,
            Instance: values
    
        }

        Connection = ConnectionStart()

        Connection.query("UPDATE Articulos SET descripcion=?, marca=?, existencia=? WHERE articuloId=?", values, (error, result) => {

            if(!error){
            
                success.Updated = true
                res.json(success)
                Connection.destroy()
                
            }else{
            
                success.Updated = false
                console.log(error)
                res.status(500).json(success, error)
                Connection.destroy()
            
            }

        })

   }catch(error){

       console.log(error)

   }

}

//Read
export function ReadAll(req, res){

    try{

        
        Connection = ConnectionStart()

        Connection.query(SQLQuery, (error, result) => {
        
            let data = []

            if(!error){
                
                for(let s = 0; s < result.length; s++){
                    
                    let fila = result[s];
                    data.push(Object.assign({}, getInstanceArticulos(fila)))

                }

                res.json(data)
                Connection.destroy()

            }else{

                console.log(data)
                res.status(500).json(data, error)
                Connection.destroy()

            }

        })

    }catch(error){
        
        console.log(error)
        
    }
}

export function Read(req, res){
    try{

    
        const { id } = req.params
        const values = [id]

        Connection = ConnectionStart()

        Connection.query("SELECT * FROM Articulos WHERE articuloId = ?", values, (error, result) => {
            
            if(!error){
                
                if(result[0]){
                    
                    res.json(getInstanceArticulos(result[0]))

                }else{

                    res.status(400).json("Not Found in Database")

                }
                Connection.destroy()

            }else{

                res.status(500).json(error)
                Connection.destroy()

            }

        })
    
    }catch(error){
        
        console.log(error)
        
    }
}

//Delete

export function Delete(req, res){
    
    try{
        
        const { id } = req.params
        const values = [id]

        const success = {

            Deleted: false,
            Instance: values

        }

        Connection = ConnectionStart()

        Connection.query("DELETE FROM Articulos WHERE articuloId = ?", values, (error, result) => {
            
            if(!error){
            
                success.Deleted = true
                res.json(success, result)
                Connection.destroy()
            
            }else{
            
                success.Deleted = false
                console.log(error)
                res.status(500).json(success, error)
                Connection.destroy()
            
            }
        })
    
    }catch(error){
        
        console.log(error)
        
    }
}

