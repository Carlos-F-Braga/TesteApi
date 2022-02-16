module.exports = async (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth){
        return res.status(401).json({
            error: true,
            code: 130,
            message: "O token de autentificação não existe!"
        })
    }

    console.log(auth);

}