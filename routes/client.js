const { Router } = require("express");
const { obtainListClients } = require("../controllers/client");
const { validateJWT } = require("../middlewares/validate-jwt");


const router = Router();

router.get('/list', validateJWT, obtainListClients)

module.exports = router;