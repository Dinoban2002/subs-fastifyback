const routes = async (app, options) =>{
    app.post('/admin-user', async (req, res) => {
        console.log('entr admin user req')
        let data = req.body
        let username = data.username;
        let password = data.password;
        let userName="admin"
        let passWord="admin"
        try {
        if(username==userName&&password==passWord){
            res.send({loginstatus:"1"})
        }
        if(username!=userName&&password==passWord){
            res.send({loginstatus:"2"})
        }
        if(username==userName&&password!=passWord){
            res.send({loginstatus:"3"})
        }
        if(username!=userName&&password!=passWord){
            res.send({loginstatus:"0"})
        }
        
        } catch (err) {
        res.send(err);  
        } 
    })
}
module.exports=routes;