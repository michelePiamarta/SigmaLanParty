CREATE DATABASE lanparty;

USE lanparty;

CREATE TABLE classe (
	id tinyint primary key auto_increment,
	sezione varchar(2)
);

CREATE TABLE studente(
	username varchar(10),
	fkclasse tinyint,
	punteggio int,
	soldi int
);

ALTER TABLE studente ADD CONSTRAINT studentepk primary key (username,fkclasse);

ALTER TABLE studente ADD CONSTRAINT fkclassestudente foreign key (fkclasse) REFERENCES classe (id);
