SELECT DISTINCT
    P.`real_name`, P.`game_race`, T.`tournament_name`
FROM
    players P
        INNER JOIN
    matches M ON P.`player_id` = M.`playerA_id`
        INNER JOIN
    tournaments T USING (`tournament_id`)
WHERE
    M.`playerA_score` >= M.`playerB_score` + 3
 
