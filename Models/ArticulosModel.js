
const ArticulosModel = {
    articuloId: 0,
    descripcion: "",
    marca: "",
    existencia: 0.00
}

export function getInstanceArticulos(row = null){
    if(row == null){
        return ArticulosModel
    }

    ArticulosModel.articuloId = row.articuloId || 0
    ArticulosModel.descripcion = row.descripcion || ""
    ArticulosModel.marca = row.marca || ""
    ArticulosModel.existencia = row.existencia || ""

    return ArticulosModel
    
}

export default ArticulosModel