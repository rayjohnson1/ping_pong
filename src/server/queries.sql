CREATE TABLE users (
    id serial primary key,
    nick_name varchar(24) not null,
    username varchar(24) not null unique,
    password text not null
);

CREATE TYPE game_difficulties AS ENUM ('beginner', 'intermediate', 'expert');

CREATE TABLE leader_boards (
    id serial primary key,
    user_id int not null,
    game_difficulty game_difficulties not null,
    pings int not null unique,
    max_ball_velocity int not null,
    foreign key (user_id) references users(id) on delete cascade on update cascade
);

