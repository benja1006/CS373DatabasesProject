SELECT 
    T.`tournament_name`, T.`region`, E.`prize_money`
FROM
    tournaments T
        INNER JOIN
    earnings E USING (`tournament_id`)
#GROUP BY T.`tournament_name`, T.`region`
#ORDER BY SUM(E.`prize_money`);
ORDER BY E.`prize_money`;