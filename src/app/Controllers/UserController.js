class UserController {
    index(req, res){
        console.log(req.body);

    }
    
    show(req, res){

        var users = ["Thiago", "Daniel", "Yasmin", "Carlos"]

        return res.status(200).json({
            error: false,
            users
        })
    }

    showr(req, res){

        var users = ["Pedro", "Cinthia", "Felipe"]

        return res.status(200).json({
            error: false,
            users
        })
    }
}

module.exports = new UserController();