-- select * from users left join goals on users.id = goals.userid where googleid = $1;
insert into goals (userid, caloriegoal)
values ($1, $2);