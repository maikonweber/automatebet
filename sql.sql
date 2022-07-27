Create Table telegramBot {
    id serial primary key,
    jsonb jsonb not null
}

CREATE TABLE robotBetPayload (
    id serial primary key,
    name varchar(255) not null,
    numberJson jsonb not null,
    jsonbPreload jsonb not null,
    created timestamp default now(),
    jsonbStrategy jsonb not null
);


--> CRASH DOUBLE IMPLEMENTATION

CREATE TABLE crash_game (
    date_ timestamp not null,
    number varchar(5) not null
);

CREATE TABLE double_game (
    date_ timestamp not null,
    number varchar(5) not null
);


CREATE TABLE robotevolution (
    id serial primary key,
    name varchar(255) not null,
    number integer[] not null,
    created timestamp default now()
);

CREATE TABLE mafia_cards (
    id serial PRIMARY KEY,
    lastNumber int(1),
    created TIMESTAMP DEFAULT now()
)

CREATE TABLE paylaoad_card (
    id serial PRIMARY KEY,
    name varchar(200) NOT null,
    number text[] not null,
    created TIMESTAMP DEFAULT now()
);

CREATE TABLE robotBetSygnal (
    id serial primary key,
    number jsonb not null,
    created timestamp default now(), 
    detectStretegy text not null,
    result boolean,
    martingale boolean,
    martingale2 boolean,
    martingale3 boolean
);

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

CREATE TABLE users_filters (
    id serial PRIMARY KEY,
    user_id integer not null references users(id),
    games jsonb not null,
    created timestamp default now(),
    string_msg text not null,
    string_msg_green text not null,
    string_msg_red text not null
);
