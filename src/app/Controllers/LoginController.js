const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/auth');
const axios = require('axios'); 

class LoginController {

    async index(req, res){
        const { email, password, phone } = req.body;

        const userExist = await User.findOne({ email })

       /* await axios.post(
            'https://api.z-api.io/instances/3A72104539D800FA7567C62DAFA304FE/token/266D65104B16CFBDE2FCFEE4/send-document/{pdf}',
            {
                "phone": phone,
                "document": "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf"
            }
            )
            .then (() =>{
                console.log("Arquivo de Whatsapp enviada com Sucesso");
            })
            .catch(err => {
                console.log(err);
            }
            )
        */
        if (!userExist){
            return res.status(400).json({ //validação de se o usuário existe
                error: true,
                message: "Usuário não existe!"
            })
        }

        if (!(await bcrypt.compare(password, userExist.password))){ //validação se a senha está errada
            return res.status(400).json({
                error: true,
                message: "A senha está inválida!"
            })
        }

        await axios.post(
            'https://api.z-api.io/instances/3A72104539D800FA7567C62DAFA304FE/token/266D65104B16CFBDE2FCFEE4/send-messages',
            {
                "phone": phone,
                "message": "login Realizado com Sucesso!"
            }
            )
            .then (() =>{
                console.log("Mensagem de Whatsapp enviada com Sucesso");
            })
            .catch(err => {
                console.log(err);
            }
            )

        return res.status(200).json({ //retorna os dados do usuário junto a uma decodificação do token pelo id
            user:{
                name: userExist.name,
                email: userExist.email,
                phone: userExist.phone
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