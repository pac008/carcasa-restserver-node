

const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe`);
    }
}

const existeCorreo = async ( correo ) => {

    const correoExiste = await Usuario.findOne({ correo });
    if ( correoExiste ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async ( id ) => {

    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error(`El Usuario con el id: ${ id }, no está registrado`);
    }
}


module.exports = {
    esRolValido,
    existeCorreo,
    existeUsuarioPorId
}