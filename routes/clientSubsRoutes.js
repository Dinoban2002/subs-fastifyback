var Client = require("../models/clientModel")
var License = require("../models/licenseModel")
var Subscription = require("../models/subscriptionModel")
const { v4: uuidv4 } = require('uuid')
var resMessage = require("../validation")
const routes = async (app, options) =>{
    app.get('/', async function (req, res) {
        try {
            let result = await Client.findAll()
            if(result.length > 0){
                res.status(200).send({status: true,message: resMessage.retrieve, result})
            }else{
                res.status(501).send({status: false , message: resMessage.no_data}) 
            }
        }catch (err) {
            res.status(501).send({status: false , message: err.message}) 
        }
    });
    app.post('/insert-user', async (req, res) => {
        let data = req.body
        if(data.companyName && data.Name && data.fileName && data.Email){
            try {   
                let apiKey = uuidv4();
                let result = await Client.create({company_name:data.companyName,contact_person:data.Name,file_names:data.fileName,email:data.Email, api_key:apiKey})
                if(result){
                    res.status(200).send({status: true, message: resMessage.inserted})
                }else{
                    res.status(501).send({status: false , message: resMessage.queryFail})
                }
            }catch (err) {   
            res.status(501).send({status: false , message: err.message})
            } 
        }else{
            res.status(501).send({status: false , message: resMessage.invalidData})
        }
    });
    app.get('/all-license', async (req, res) => {
        try {
            let result = await License.findAll()
            if(result.length > 0){
                res.status(200).send({status: true,message: resMessage.retrieve, result})
            }else{
                res.status(501).send({status: false , message: resMessage.no_data}) 
            }
        } catch (err) {
            res.status(501).send({status: false , message: err.message})
        }
    });
    app.post('/make-subs', async (req, res) => {
        let data = req.body
        if(data.clientId && data.licenseId && data.startDate && data.endDate && data.noofUsers){
            try {   
                let result = await Subscription.create({_kf__clientid__lsxn:data.clientId,_kf__licenseid__lsxn:data.licenseId,start_date:data.startDate,end_date:data.endDate,no_of_user:data.noofUsers,is_server:data.server})
                if(result){
                    res.status(200).send({status: true, message: resMessage.inserted})
                }else{
                    res.status(501).send({status: false , message: resMessage.queryFail})
                }
            } catch (err) {     
            res.status(501).send({status: false, message: err.message})
            } 
        }else{
            res.status(501).send({status: false , message: resMessage.invalidData})
        }
    });
    app.post('/update-subs', async (req, res) => {
        let data = req.body
        if(data.clientId && data.licenseId && data.eStartDate && data.eEndDate && data.eNoUsers){
            try {  
                let result = await Subscription.update({_kf__clientid__lsxn:data.clientId,_kf__licenseid__lsxn:data.licenseId,start_date:data.eStartDate,end_date:data.eEndDate,no_of_user:data.eNoUsers,is_server:data.server }, {where:{__kp__subsid__lsan :data.subscriptionId}})
                if(result[0]){
                    res.status(200).send({status:true, message: resMessage.updated})
                }
                else{
                    res.status(501).send({status: false, message: resMessage.not_updated})
                }
            }catch (err) {     
                res.status(501).send({status: false , message: err.message})
            } 
        }else{
            res.status(501).send({status: false , message: resMessage.invalidData})
        }
    });
    app.post('/view-subs', async (req, res) => {
        let data = req.body
        try {
            Subscription.belongsTo(License,{targetKey:'__kp__licenseid__lsan',foreignKey:'_kf__licenseid__lsxn'})
            let result = await Subscription.findAll({
                where:{_kf__clientid__lsxn:data.clientId},
                include: {
                    model: License,
                    required:true,
                    attributes:['name', 'version','type']
                },
                order: [
                    ['start_date', 'DESC']
                ]
            })
            if(result.length > 0){
                res.status(200).send({status: true,message: resMessage.retrieve, result})
            }else{
                res.status(501).send({status: false , message: resMessage.no_data,result}) 
            }
        } catch (err) {
            res.status(501).send({status: false , message: err.message}) 
        }
    });
}
module.exports=routes;
