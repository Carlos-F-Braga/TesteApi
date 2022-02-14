const User = require('../Models/User');


class UserController {
    
    /*index(req, res){ console.log(req.body); } */
    
    show(req, res){

        var users = ["Thiago", "Daniel", "Yasmin", "Carlos"]

        return res.status(200).json({
            error: false,
            users
        })
    }

    showr(req, res){

        var users = ["Pedro", "Cinthia", "Felipe", "Luan"]

        return res.status(200).json({
            error: false,
            users
        })
    }

    async store(req, res){


        //Validação futura       


        const { name, email, password } = req.body;


        const dados = { name, email, password };


        await User.create(dados, (err) => {
            if(err) return res.status(400).json({
                error: true,
                message: "Erro ao tentar inserir usuário no MongoDB"
            })


        return res.status(200).json({
            error: false,
            message: "Usuário Cadastrado com sucesso"
        })
        })

    } 
}

module.exports = new UserController();