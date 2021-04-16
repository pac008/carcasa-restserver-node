
const { response, request } = require('express');


const usuariosGet = (req = request, res = response) => {
    const { mensaje, nombre = 'sin nombre', trabajo = "Sin trabajo"} = req.query;
    res.json({
        mes:'get api - controllers',
        mensaje,
        nombre,
        trabajo
    })
}

const usuariosPost = (req, res = response) => {
    const body = req.body;
    res.json({
        msg:'Post api controller ',  
        body
    })
}
const usuariosPut = (req, res = response) => {
    let { id } = req.params;
    res.json({ 
            msg: 'put api - controllers',
            id })
}

const usuariosDelete = (req, res = response) => {
    res.json({msg:'delete api - controllers'})
}

const usuariosPatch = (req, res = response) => {
    res.json({msg:'patch api - controllers'})
}


module.exports= {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}