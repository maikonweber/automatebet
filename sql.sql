Create Table telegramBot {
    id serial primary key,
    jsonb jsonb not null
}


CREATE TABLE roullete (
id serial PRIMARY KEY,
oom varchar(200),
message varchar(100),
result varchar(100),
aposta varchar(100));

CREATE TABLE roullete_new(
id serial PRIMARY KEY,
room varchar(200),
aposta varchar(100),
result boolean default false,
firstGale boolean default false,
secondGale boolean default false;
)

CREATE TABLE bet365LiveRoullete (
id serial PRIMARY KEY,
result integer,
created timestamp default now()
);

CREATE TABLE users (
id serial PRIMARY KEY,
name varchar(200) not null,
username varchar(40) not null,
password varchar(40)  not null,
sal text not null,
email varchar(200) not null,
phone varchar(200) not null,
address varchar(200) not null
);

CREATE TABLE 
