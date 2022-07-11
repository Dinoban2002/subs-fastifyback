const fastify = require('fastify')
const app = fastify()

app.register(require("./routes/clientSubsRoutes"));
app.register(require("./routes/authenticationRoutes"));
app.register(require('fastify-cors'), {origin: "*",
methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
allowedHeaders: ['Content-Type', 'Authorization'] });

app.listen(3007, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server' listening on ${address}`)
})