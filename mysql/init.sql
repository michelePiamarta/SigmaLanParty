CREATE DATABASE lanparty;

USE lanparty;

CREATE TABLE studenti(
	id smallint primary key auto_increment,
	username varchar(15),
	punteggio int,
	sezione varchar(2)
);