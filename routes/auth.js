const { Router } = require("express");
const { check } = require("express-validator");

const { login, signUp, renewToken } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateResults } = require("../middlewares/validate-result");

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateResults
], login);

router.post('/signup', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateResults
], signUp);

router.get('/renew', validateJWT ,renewToken);

module.exports = router;