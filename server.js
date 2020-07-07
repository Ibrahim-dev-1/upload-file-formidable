const Formidable = require("formidable");
const express = require("express");
const bodyParser = require("body-parser");
const { join }  =  require("path");
const fs = require("fs");

let app = express();
let progress = 0;

app.use(bodyParser.json());
app.use("/js", express.static(join(__dirname, "js")));

app.get("/", (req,res) => {
    res.sendFile(join(__dirname, "index.html"))
})

 fs.mkdir("uploads", err => {return ; })

    
app.post("/upload", async (req,res) => {
    const form = Formidable.IncomingForm();
    form.uploadDir = __dirname + "/uploads";
    form.maxFileSize= 900 * 1024 * 1024 // 900 MO
    form.parse(req, (err, fields, file ) => {
        if(err){
            console.log(err)
            res.json({ ok: false, msg: "Error parsing file ", error: err});
        }
        fs.rename(file.myFile.path,join(__dirname,"uploads",file.myFile.name), (err) => {if (err){ console.log("Erreur de renommage du fichier")}})
    })
   
    
    form.on("end", () => res.send({ok: true, msg: "Le fichier à été uploader "}))
})


const port = process.env.PORT || 9000
app.listen(port, () => console.log(" le serveur est démarrer sur le port 9000"))