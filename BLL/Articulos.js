import { getInstanceArticulos } from "../Models/ArticulosModel.js"
import { ConnectionStart } from "../DAL/Connection.js"

let Connection = ConnectionStart()
let SQLQuery = "SELECT articuloId, descripcion, marca, existencia FROM Articulos"


//Create
export function Create(ArticulosModel, res){
    
    try{

        const values = [

            ArticulosModel.descripcion,
            ArticulosModel.marca,
            ArticulosModel.existencia

        ]

        const success = {

            Created: false,
            Instance: values

        }

        Connection = ConnectionStart()

        Connection.query("INSERT INTO Articulos (descripcion, marca, existencia) VALUES (?,?,?)", values, (error, result) => {
            
            if(!error){
            
                success.Created = true
                Connection.destroy()
                res.json(success)
            
            }else{
            
                success.Created = false
                Connection.destroy()
                console.log(error)
                res.status(500).json(success, error)
            
            }

        })

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
                Connection.destroy()
                res.json(success)
            
            }else{
            
                success.Updated = false
                Connection.destroy()
                console.log(error)
                res.status(500).json(success, error)
            
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

                Connection.destroy()
                res.json(data)

            }else{

                Connection.destroy()
                console.log(data)
                res.status(500).json(data, error)

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

                Connection.destroy()
                res.status(500).json(error)

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
                Connection.destroy()
                res.json(success)
            
            }else{
            
                success.Deleted = false
                Connection.destroy()
                console.log(error)
                res.status(500).json(success, error)
            
            }
        })
    
    }catch(error){
        
        console.log(error)
        
    }
}

