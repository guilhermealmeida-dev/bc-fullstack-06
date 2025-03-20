import expres from "express";

const server = expres();

server.get("/get", (req, res)=>{
    res.status(200).send("Endpoint funcionando!");
})

server.listen(3000,()=>{
    console.log("Servidor escultando na porta 3000");
});