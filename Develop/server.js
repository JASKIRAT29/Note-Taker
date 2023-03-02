// // // Creates necessary Dependencies.
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');
//  const uuid = require("uuid");
const { v4: uuidv4 } = require("uuid");
// // // Reads a JavaScript file, executes it, and then proceeds to return the export JSON objects.
const notesWrite = require("./db/db.json");

// // // Sets Port.
const PORT = process.env.PORT || 3000;

// // // This will create an express server.
const app = express();

app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
   res.json(notesWrite);
});

// // // This parses string or array.
app.use(express.urlencoded({extended: true}));

// // // This parses JSON data.
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
//  app.post('/api/notes', function(req, res) {
//     var body = '';
//     filePath = __dirname + notesWrite;
//     req.on('data', function(data) {
//         body += data;
//     });

//     req.on('end', function (){
//         fs.appendFile(filePath, body, function() {
//             res.json();
//         });
//     });
// });
// app.post("/api/notes", (req, res) => {
// 	const { title, text } = req.body;

// 	if (title && text) {
// 		const newNotes = {
// 			title,
// 			text,
// 			id: uuid(),
// 		};

// 		readAndAppend(newNotes, "./db/db.json");

// 		const response = {
// 			status: "success",
// 			body: newNotes,
// 		};

// 		res.json(response);
// 	} else {
// 		res.json("Error in posting notes");
// 	}
// });

//  app.post('/notes', function(req, res) {
//     saveFile(req.query.url, req.body.body);
//   });
// function saveNotes(){
//     // submitNotes = [];
//     let submitNotes = {
//         text: any,
//         title: any,
//     };
//     notesWrite.push(submitNotes);
//     fs.writeFile(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify(submitNotes, null, 2)
//     );
   
// // STEP 3: Writing to a file
// // fs.writeFile("./db/db.json", JSON.stringify(notesWrite), err => {
    
// //     // Checking for errors
// //     if (err) throw err; 
  
// //     console.log("Done writing"); // Success
// // });
// }
// app.post("/api/notes", (req, res) => {
//     const newNote = saveNotes();
//     res.json(newNote);
// });
// // // This function will allow user to save new notes.
// This function will allow user to save new notes.
// function createNewNotes(body, notesArray) {
//     const newNote = body;
//     if (!Array.isArray(notesArray))
//         notesArray = [];
   
//     if (notesArray.length === 0)
//         notesArray.push(0);

//     body.id = notesArray[0];
//     notesArray[0]++;

//     notesArray.push(newNote);
//     fs.writeFileSync(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify(notesArray)
//     );
//     return newNote;
// }
function saveNotes(body, storearray){
   // let body;
   const newData = body;
   // let storearray=[];
   // if (storearray.length === 0)
   // storearray.push(0)

   fs.open("./db/db.json", "r", (err, file) => {
    if (err) throw err;
   fs.readFile('./db/db.json', 'utf8', (err,jsonData) => {
    if (err) throw err;

        const storearray = JSON.parse(jsonData); 

newData.id = uuidv4();
storearray.push(newData)
fs.writeFileSync(
   path.join(__dirname, './db/db.json'),
   JSON.stringify(storearray)
);
   });
});
   storearray.push(newData)



       return newData;
}
//Post method will bring user input to back-end.  
app.post("/api/notes", (req, res) => {
   // const newNote = createNewNotes(req.body, notesWrite);
   const newSaveMode = saveNotes(req.body,notesWrite);
   res.json(newSaveMode);
   // fs.readFile('./db/db.json', 'utf8', (err, data) => {
   //     const dbData = JSON.parse(data); // --> turn it into an array

   //     // add an id to the req.body
   //     req.body.id = dbData.length + 1;
       
   //     // add the req.body to the array
   //     dbData.push(req.body);

   //     fs.writeFile('./db/db.json', JSON.stringify(dbData), (err) => {
   //         res.send('Note has been added!')
   //     })
   // })
   // res.json(newNote);
});

// // // This function will allow user to delete previous notes.
//  function deleteExistingNotes(id, notesArray) {
//     for (let i = 0; i < notesArray.length; i++) {
//         let note = notesArray[i];

//          if (note.id == id) {
//              notesArray.splice(i, 1);
//              fs.writeFileSync(
//                  path.join(__dirname, './db/db.json'),
//                  JSON.stringify(notesArray, null, 2)
//              );

//              break;
//          }
//      }
// }

// // // Delete method will allow user to delete previous saved notes.
//  app.delete('/api/notes/:id', (req, res) => {
//      deleteExistingNotes(req.params.id, notesData);
//      res.json(true);
//  });

// // // Listener.
app.listen(PORT, () => {
    console.log(`The Server is listening on PORT: ${PORT}`);
});

