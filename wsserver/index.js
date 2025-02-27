const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

var con = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "cisco",
  database: "lanparty",
  connectionLimit: 10
});

con.connect((err) => {
  if(err){
    console.log(err)
  }
  console.log("Connected!");
});

app.get('/classe/:classe', (req, res) => {
  const classe = req.params.classe;

  var query = "INSERT INTO classe (sezione) VALUES (?)";

  con.query(query, [classe], (err, result) => {
    if(err){
      console.log(`errore nell'inserimento della classe ${err.message}`);
      res.status(500).send({message:`Errore interno del server`});
      return;
    }
    console.log(`inserita classe ${classe}`);
    res.status(201).send({message:`Classe ${classe} aggiunta`});
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});