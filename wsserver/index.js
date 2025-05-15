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

app.post('/studente', (req, res) => {
  console.log(req)
  const username = req.body.username;
  const punteggio = req.body.punteggio;
  const sezione = req.body.sezione;

  var query = "INSERT INTO studenti (username,punteggio,sezione) VALUES (?,?,?)";

  con.query(query, [username,punteggio,sezione], (err, result) => {
    if(err){
      console.log(`errore nell'inserimento dello studente ${err.message}`);
      res.status(500).send({message:`Errore interno del server`});
      return;
    }
    console.log(`studente inserito con successo`);
    res.status(201).send({message:`studente ${username} aggiunta`});
  });
});

app.get('/classeVincitrice', (req,res) => {
  var query = "SELECT s.sezione,sum(s.punteggio) as punteggio FROM studenti s group by s.sezione order by punteggio";

  con.query(query, [], (err, result) => {
    if(err){
      console.log(`errore nel calcolo della classifica ${err.message}`);
      res.status(500).send({message:`Errore interno del server`});
      return;
    }
    console.log(`classifica calcolata: ${result}`);
    res.status(201).send(result);
  });
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

