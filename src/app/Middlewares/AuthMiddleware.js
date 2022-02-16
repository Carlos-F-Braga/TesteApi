const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const { promisify } = require('util');

module.exports = async (req, res, next) => { 
    const auth = req.headers.authorization;

    if (!auth){ //token inexistente
        return res.status(401).json({
            error: true,
            code: 130,
            message: "O token de autentificação não existe!"
        })
    }

    const [, token] = auth.split(' ');

    try { 
        const decoded = await promisify(jwt.verify)(token, config.secret);

        if(!decoded){ //token expirado
            return res.status(401).json({
                error: true,
                code: 130,
                message: "O token está expirado!"
            })
        } 
        else{ //tudo deu certo
            req.user_id = decoded.id;
            next();
        }
    }
    catch{
        return res.status(401).json({ //token inválido
            error: true,
            code: 130,
            message: "O token está inválido!"
        })   
    }
}