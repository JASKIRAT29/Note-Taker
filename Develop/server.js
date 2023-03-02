const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');
//  Installed the below uuid for generating the unique id
const { v4: uuidv4 } = require("uuid");
const notesWrite = require("./db/db.json");

 // Sets Port.
const PORT = process.env.PORT || 3000;

// This will create an express server.
const app = express();

app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
   res.json(notesWrite);
});

app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
function saveNotes(body, storearray){
   const newData = body;
// opened the json file from local directory and read to convert it into array for reading the objects.
   fs.open("./db/db.json", "r", (err, file) => {
    if (err) throw err;
   fs.readFile('./db/db.json', 'utf8', (err,jsonData) => {
    if (err) throw err;
// Json array
    const storearray = JSON.parse(jsonData); 

    newData.id = uuidv4();
    storearray.push(newData)
    //write file using file handling into the local json file with unique id and store in the form of string using stringify
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
    JSON.stringify(storearray)
);
   });
});
//push method used in array to append the data into the file.
    storearray.push(newData)
    return newData;
}
//Post method to save the data in local json file in back-end and work as database.  
app.post("/api/notes", (req, res) => {
   const newSaveMode = saveNotes(req.body,notesWrite);
   res.json(newSaveMode);
   
});


app.listen(PORT, () => {
    console.log(`The Server is listening on PORT: ${PORT}`);
});

