const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const yup = require('yup');
const axios = require('axios');

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
            password: yup.string().required(),
            phone: yup.string().required()
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
        const { name, email, password, phone } = req.body;


        //Criação da constante data
        const data = { name, email, password, phone };

        //Criptografar a senha
        data.password = await bcrypt.hash(data.password, 8);

        //Envio mensagem de whatsapp por Z-api -- comentar quando acabar a free trial
        await axios.post(
            'https://api.z-api.io/instances/3A72104539D800FA7567C62DAFA304FE/token/266D65104B16CFBDE2FCFEE4/send-messages',
            {
                "phone": phone,
                "message": "Seja muito bem vindo a AgroFauna!"
            }
            )
            .then (() =>{
                console.log("Mensagem de Whatsapp enviada com Sucesso");
            })
            .catch(err => {
                console.log(err);
            }
            )
       
            //Envio imagem de whatsapp por Z-api --comentar quando acabar a free trial
            await axios.post(
                'https://api.z-api.io/instances/3A72104539D800FA7567C62DAFA304FE/token/266D65104B16CFBDE2FCFEE4/send-image',
                {
                    "phone": phone,
                    "image": "https://revistadigital.agrofauna.com.br/img/blog/agrofauna.jpg"
                }
                )
                .then (() =>{
                    console.log("Imagem de Whatsapp enviada com Sucesso");
                })
                .catch(err => {
                    console.log(err);
                }
                )
            
                await axios.post(
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