var User = require("../models/loginModel")
const bcrypt = require("bcrypt")
var resMessage = require("../validation")
const routes = async (app, options) =>{
    app.post('/admin-user', async (req, res) =>{
        let data = req.body
        let username = data.username
        let password = data.password
        try{
            let result = await User.findAll({where:{username: username }});
            if(result.length == 0){
                res.status(200).send({status: false, message: resMessage.invalidUser})
            }else{
                let validPass = await bcrypt.compare(password, result[0].password);
                if(validPass){
                    res.status(200).send({status: true, message:resMessage.success})
                }else{
                    res.status(200).send({status: false, message: resMessage.invalidPass})
                }
                }
        }
        catch(e){
            res.status(501).send({status: false , message: e.message})
        }
    })
    app.post('/signup', async function (request, res) {
        let user = request.body
        let username = user.username 
        let password = user.password
        try{
            let result =  await User.findAll({where:{username: username }})
            if(result.length == 0){
                let salt = await bcrypt.genSalt(10);
                let hash = await bcrypt.hash(password, salt);
                let result = await User.create({username:username,password:hash})
                if(result){
                    res.status(200).send({status: true, message: resMessage.createAccount})
                }else{
                    res.status(501).send({status: false , message: err.message})
                }
            }
            else{
                res.status(200).send({status: false, message: resMessage.alreadyExist})
            }
        }
        catch(e){
            res.status(501).send({status: false , message: e.message})
        }
    })
}
module.exports=routes;