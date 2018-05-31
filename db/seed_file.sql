create table users (
    id serial primary key,
    displayName varchar(80),
    googleID varchar(160) not null unique,
    userIMG varchar(250) 
);
create table goals (
    id serial primary key,
    userID integer unique,
    calorieGoal integer,
    fatGoal integer,    
    proteinGoal integer,
    carbGoal integer,
    foreign key (userID) references users(id)
);

create table foodLog (
    id serial primary key,
    userID integer,
    label varchar(80),
    foodTime timestamp,
    fat integer,
    protein integer,
    carb integer,
    calories integer,
    foreign key (userID) references users(id)
);