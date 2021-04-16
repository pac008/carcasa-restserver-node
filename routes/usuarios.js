
const { usuariosGet, 
        usuariosPost,
        usuariosDelete,
        usuariosPut,
        usuariosPatch } = require('../controllers/usuarios');
const { Router } = require('express');



const router = Router();


router.get('/', usuariosGet )

router.post('/', usuariosPost )

router.put('/:id', usuariosPut)

router.delete('/', usuariosDelete )

router.patch('/', usuariosPatch )



module.exports = router;