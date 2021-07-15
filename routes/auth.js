const { Router } = require('express');
const { check } = require('express-validator');


const { login, googleSingIn, renovarToken } = require('../controllers/auth');
const { validarCampos, validarJWT } = require('../middlewares');



const router = Router();


router.post('/login',[
    check('correo', 'EL correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

router.post('/google',[
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSingIn );

router.get('/', validarJWT, renovarToken )





module.exports = router;