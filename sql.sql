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