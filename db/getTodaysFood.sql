SELECT * FROM foodlog
WHERE userid = $1
AND foodtime >= $2
AND foodtime <  $3;