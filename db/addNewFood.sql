insert into foodlog (userid, label, fat, protein, carb, calories, foodtime)
values ( $1, $2, $3, $4, $5, $6, now());