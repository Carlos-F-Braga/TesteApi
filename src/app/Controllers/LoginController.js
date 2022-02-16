const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/auth');

class LoginController {

    async index(req, res){
        const { email, password } = req.body;

        const userExist = await User.findOne({ email })

        if (userExist){
            return res.status(400).json({ //validação de se o usuário existe
                error: true,
                message: "Usuário não existe!"
            })
        }

        if (!(await bcrypt.compare(userExist.password, userExist))){ //validação se a senha está errada
            return res.status(400).json({
                error: true,
                message: "A senha está inválida!"
            })
        }

        return res.status(200).json({ //retorna os dados do usuário junto a uma decodificação do token pelo id
            user:{
                name: userExist.name,
                email: userExist.email
            },
            token: jwt.sign(
                {id: userExist._id},
                config.secret,
                {expiresIn: config.expireIn}
                )
        })
    }
}

module.exports = new LoginController();