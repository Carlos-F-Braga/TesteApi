const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const yup = require('yup');

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


        //Validação através do YUP schema - Inicio      
        let schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required()
          });


          if(!(await schema.isValid(req.body))){
              return res.status(400).json({
                error: true,
                message: "Dados Inválidos"
              })
          }
          //Validação através do YUP schema - Fim   


        //Validação de se já existe tal email no banco de dados
        let userExist = await User.findOne({email: req.body.email})
        if(userExist){
            return res.status(400).json({
                error: true,
                message: "Este usuário já existe!"
        })
    }

        //Desestruturação dos dados da requisição
        const { name, email, password } = req.body;


        //Criação da constante data
        const data = { name, email, password };

        //Criptografar a senha
        data.password = await bcrypt.hash(data.password, 8);

        //Inserção no banco de dados
        await User.create(data, (err) => {
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