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