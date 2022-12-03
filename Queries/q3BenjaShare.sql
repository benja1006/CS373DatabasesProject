SELECT 
    T.`tournament_name`, T.`region`, SUM(E.`prize_money`) as Total_prize_money
FROM
    tournaments T
        INNER JOIN
    earnings E USING (`tournament_id`)
GROUP BY T.`tournament_name` , T.`region`
HAVING Total_prize_money >= 10000
ORDER BY SUM(E.`prize_money`) DESC;
