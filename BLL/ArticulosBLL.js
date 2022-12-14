import { getInstanceArticulos } from "../Models/ArticulosModel.js"

import { ConnectionStart } from "../DAL/Connection.js"

let Connection = ConnectionStart()
let SqlQuery = "SELECT articuloId, descripcion, marca, existencia FROM Articulos"


//Metodos CRUD


//Guardar Datos
export function saveInstance(req, res){

    const ArticulosModel = getInstanceArticulos(req.body)

    if(ArticulosModel.articuloId != null || ArticulosModel != 0){
        
        insertInstance(ArticulosModel, res)

    }else{

        updateInstance(ArticulosModel, res)

    }

}

//Insertar un registro
function insertInstance(ArticulosModel, res){
    
    const values = [
        ArticulosModel.descripcion,
        ArticulosModel.marca,
        ArticulosModel.existencia
    ]

    const success = {
        Created: false
    }

    Connection = ConnectionStart()

    Connection.query("INSERT INTO Articulos (descripcion, marca, existencia) VALUES (?,?,?)", values, (err, result) => {
        if(!err){
            success.Created = true
            Connection.destroy()
            res.json(success)
        }else{
            success.Created = false
            Connection.destroy()
            console.log(err)
            res.status(500).json(success, err)
        }
    })

}

//Actualizar un registro
function updateInstance(ArticulosModel, res){

    const values = [
        ArticulosModel.articuloId,
        ArticulosModel.descripcion,
        ArticulosModel.marca,
        ArticulosModel.existencia
    ]

    const success = {
        Updated: false
    }

    Connection = ConnectionStart()

    Connection.query("UPDATE Articulos SET descripcion=?, marca=?, existencia=? WHERE articuloId=?", values, (err, result) => {
        if(!err){
            success.Updated = true
            Connection.destroy()
            res.json(success)
        }else{
            success.Updated = false
            Connection.destroy()
            console.log(err)
            res.status(500).json(success, err)
        }
    })

}

//Borrar un registro
export function deleteInstance(req, res){
    const { id } = req.params
    const values = [id]

    const success = {
        Deleted: false
    }

    Connection = ConnectionStart()
    Connection.query("DELETE FROM Articulos WHERE articuloId = ?", values, (err, result)=>{

        if(!err){
            success.Deleted = true
            Connection.destroy()
            res.json(success)
        }else{
            success.Deleted = false
            Connection.destroy()
            console.log(err)
            res.status(500).json(success, err)
        }
    })
}

//Mostrar todos los registros
export function listInstances(req, res){

    Connection = ConnectionStart()

    Connection.query(SqlQuery, (err, result) => {
        
        let data = []

        if(!err){
            for(let s = 0; s < result.length; s ++){
                let fila = result[s];
                data.push(Object.assign({}, getInstanceArticulos(fila)))
            }
            Connection.destroy()
            res.json(data)
        }else{
            Connection.destroy()
            console.log(data)
            res.status(500).json(data, err)
        }
    })
}

//Mostrar un registro
export function findInstance(req, res){

    const { id } = req.params
    const values = [id]

    Connection = ConnectionStart()

    Connection.query(SqlQuery + " WHERE articuloId = ?", values, (err, result)=>{
        if(!err){

            Connection.destroy()
            res.json(getInstanceArticulos(result[0]))
        }else{
            Connection.destroy()
            res.status(500).json(err)
        }
    })
}
