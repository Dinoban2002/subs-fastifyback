var resMessage = require("../validation")
const routes = async (app, options) =>{
    app.post('/admin-user', async (req, res) =>{
        let data = req.body
        let username = data.username
        let password = data.password
        let validUsername = "admin"
        let validPassword = "admin"
        try {
            if(username != validUsername){
                res.status(501).send({status: false, message: resMessage.invalidUser})
            }else if(username == validUsername && password != validPassword){
                res.status(501).send({status: false, message: resMessage.invalidPass})
            }else if(username == validUsername && password == validPassword){
                res.status(200).send({status: true, message: resMessage.success})
            }
        } catch (err) {
        res.status(501).send({status:false,message:err.message}) 
        } 
    })
}
module.exports=routes;